export { };
const Teams = require("./../Models/team.model");
import { Request, Response, NextFunction } from "express-serve-static-core";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
interface req extends Request {
  team: any
  ans: boolean
  time: Date
  ques: number
  hintFlag: {
    used: boolean;
    typeUsed?: string
  }
  img: {
    status: 'now' | 'idk';
    src: string | null
  }
}

const generateSet = (num: number) => {
  switch (num % 6) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    case 4:
      return "E";
    case 5:
      return "F";
    default:
      return undefined;
  }
};

const randomCode = () => Math.random().toString(36).substring(2, 10);

const time = () => {
  return (new Date().toLocaleString())
}

const sanitiseNumber = (num: string) => {
  let value = num;
  let mobile = "";
  value = value.replace(/\s/g, "");
  if (value.startsWith("+")) {
    var temp = value.substring(3, value.length);
    mobile = temp;
  } else {
    mobile = value;
  }
  return parseInt(mobile);
};

const quesURL =
  process.env.NODE_ENV === "production"
    ? "https://chem-i-leon.herokuapp.com/questions"
    : "http://localhost:5000/questions";

exports.verifyToken = async (req: req, res: Response, next: NextFunction) => {
  const token = req.header("authToken");
  if (!token) return res.status(401).send("access denied");
  try {
    const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.team = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

exports.getTeamData = async (req: req, res: Response) => {
  try {
    const team = await Teams.findOne({ _id: req.team.team }, { password: 0, logs: 0 });
    if (team) return res.status(200).send({ team, auth: true, active: process.env.ACTIVE });
    return res.status(404).send("Team Not Found");
  } catch (err) {
    console.log({ getTeamData: err })
    res.sendStatus(500);
  }
};

exports.teamByName = async (req: req, res: Response) => {
  const name = req.params.name;

  try {
    const team = await Teams.find({ teamName: { $regex: `^${name}`, $options: 'i' } })
    if (team) return res.status(200).send({ message: true, team });
    else return res.send({ message: false, team: null })
  } catch (err) {
    console.log({ teamByName: err })
    return res.status(500).send(err)
  }
}

exports.create = async (req: req, res: Response) => {
  const team = req.body.team;
  const name = req.body.name;
  const email = req.body.email;
  const number = sanitiseNumber((req.body.number).toString());
  let password = req.body.password
  if (number.toString().length < 10) {
    return res.status(400).send("Enter a Valid Phone Number")
  }
  if (password.length < 8) {
    return res.status(400).send('Password should have a minimum length of 8 digits')
  }
  try {
    if (await Teams.countDocuments() >= process.env.No_of_Teams) { return res.status(406).send("Registrations have been closed") }
    let Team = await Teams.findOne({
      $or: [{ teamName: team }, { "leader.email": email }, { 'leader.number': number }, {
        members: {
          $elemMatch: {
            $or: [{ email }, { number }]
          }
        }
      }],
    });

    if (Team) return res.status(409).send("Team Name/Email Already Exists");
    const set = generateSet(await Teams.countDocuments());
    password = await bcrypt.hash(password, 10);
    Team = new Teams({
      teamName: team,
      set,
      joinCode: randomCode(),
      leader: {
        name,
        email,
        number,
      },

      password,
      logs: [`Team Created at ${time()}`]
    });
    await Team.save();
    return res.status(201).send("Team Created");
  } catch (err) {
    console.log({ create: err })
    res.status(500).send(err)
  }
};

exports.join = async (req: req, res: Response) => {
  const code = req.body.code;
  const name = req.body.name;
  const email = req.body.email;
  const number = sanitiseNumber((req.body.number).toString());
  if (number.toString().length < 10) {
    return res.status(400).send("Enter a Valid Phone Number")
  }

  try {
    const existingTeam = await Teams.findOne({
      $or: [{ "leader.email": email }, { 'leader.number': number }, {
        members: {
          $elemMatch: {
            $or: [{ email }, { number }]
          }
        }
      }],
    });
    if (existingTeam) return res.status(400).send("Email or number already registered");
    const Team = await Teams.findOne({ joinCode: code });
    if (Team == null) return res.status(400).send("Incorrect Team Code");
    if (Team.members.length >= 3) return res.status(400).send("Team is Full");
    await Teams.updateOne(
      { joinCode: code },
      {
        $push: {
          members: { name, email, number },
          logs: `${name} joined on ${time()}`
        },
      }
    );
    res.status(200).send("Member Added");
  } catch (err) {
    console.log({ join: err })
    res.status(500).send(err);
  }
};

exports.login = async (req: req, res: Response) => {
  const teamName = req.body.team;
  const password = req.body.password;
  try {
    const team = await Teams.findOne({ teamName });
    if (team) {
      if (await bcrypt.compare(password, team.password)) {
        const token = jwt.sign(
          { team: team._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.status(202).header("authToken", token).send({
          team,
          auth: true,
        });
      } else return res.status(400).send("Incorrect Password");
    }
    return res.status(400).send("Team doesn't exist");
  } catch (err) {
    console.log({ login: err })
    res.status(500).send(err);
  }
};

exports.view = async (req: req, res: Response) => {
  try {
    const teams = await Teams.find(
      {},
      { joinCode: 0, members: 0, answers: 0, password: 0, set: 0 }
    ).sort({ score: -1 }).limit(10);
    res.status(200).send(teams);
  } catch (err) {
    console.log({ view: err })
    res.status(500).send(err);
  }
};

/*
 * Scoring Mechanic
 * First Verify Answer
 * If correct increment the score based on time taken to answer
 * Then change the team's  answer array
 */

exports.verifyAnswer = async (req: req, res: Response, next: NextFunction) => {
  const answer = req.body.ans;
  const id = req.team.team;
  try {

    const team = await Teams.findOne(
      { _id: id },
      { members: 0, password: 0, leader: 0 }
    );

    if (team) {

      const set = team.set;
      req.ques = team.ques;
      req.hintFlag = team.hintFlag
      req.img = { status: 'idk', src: null }
      const questions = await axios.get(`${quesURL}/${set}`);
      if (questions) {

        if (questions.data.questions[team.ques].ans === answer) {
          req.time = team.updatedAt;
          req.ans = true;
          if (questions.data.specialQuestion === team.ques + 1) {
            req.img = { status: 'now', src: questions.data.img }
          }
          next()
        }
        else {
          req.ans = false;
          next()
        }
      } else return res.sendStatus(500);
    } else return res.sendStatus(404);
  } catch (err) {
    console.log({ verifyAnswer: err })
    res.status(500).send(err);
  }
}

const calculateScore = (quesNumber: number, time: Date, hintFlag: { used: boolean, typeUsed?: string }) => {

  if (hintFlag.used) {
    if (hintFlag.typeUsed === 'type1') return 250
    if (hintFlag.typeUsed === 'type2') return 0
  }

  else {
    const prev = time;
    const now = new Date();
    const diff = parseFloat(((now.valueOf() - prev.valueOf()) / (1000 * 60)).toFixed(2))
    console.log(diff)
    if (quesNumber === 0) return 1000
    else if (diff <= 2) return Math.round(1000 - diff * 100 / 4);
    else if (diff <= 4) return Math.round(1000 - diff * 100 / 4)
    else if (diff <= 6) return Math.round(1000 - diff * 200 / 6)
    else if (diff <= 8) return Math.round(1000 - diff * 300 / 8)
    else if (diff < 10) return Math.round(1000 - diff * 500 / 10)
    else if (diff >= 10) return (500)
  }

}

exports.changeScore = async (req: req, res: Response) => {
  const specialQuestion = req.img

  const ans = req.ans;
  if (!ans) return res.send({ message: 'Incorrect', special: specialQuestion })

  const id = req.team.team;
  const quesNumber = req.ques;
  const hintFlag = req.hintFlag


  try {
    const score = calculateScore(quesNumber, req.time, hintFlag);
    await Teams.updateOne({ _id: id }, {
      $set: { ques: quesNumber + 1, hintFlag: { used: false, typeUsed: null } }, $inc: {
        score
      },
      $push: {
        logs: `Question Number ${quesNumber + 1} answered correctly on ${time()} and earned ${score} points`
      }
    })

    return res.send({ message: 'Correct', special: req.img })
  } catch (err) {
    console.log({ changeScore: err })
    return res.status(500).send(err)
  }

};

exports.useHint = async (req: req, res: Response) => {
  const id = req.body.id;
  const hintType = req.body.hintType

  try {
    const team = await Teams.findOne({ _id: id })
    if (team) {

      if (team.hints[hintType] > 0) {
        await Teams.updateOne({ _id: id }, {
          $set: {
            hintFlag: { used: true, typeUsed: hintType }
          },
          $inc: {
            [`hints.${hintType}`]: - 1
          },
          $push: {
            logs: `Hint ${hintType} used at ${time()}`
          }
        })
        return res.status(200).send('Hint Used Successfully')
      }
      else return res.send(`No hint of type ${hintType} is left`)
    } return res.sendStatus(404)
  } catch (err) {
    console.log({ useHint: err })
    res.status(500).send(err)
  }
}