export { };
const Teams = require("./../Models/team.model");
import { Request, Response, NextFunction } from "express-serve-static-core";
import { nextTick } from "node:process";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
interface req extends Request {
  team: any;
  ans: boolean
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

const quesURL =
  process.env.NODE_ENV === "production"
    ? "/questions"
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
    const team = await Teams.findOne({ _id: req.team.team });
    if (team) return res.status(200).send({ team, auth: true });
    return res.status(404).send("Team Not Found");
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.create = async (req: req, res: Response) => {
  const team = req.body.team;
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  try {
    let Team = await Teams.findOne({
      $or: [{ teamName: team }, { "leader.email": email }],
    });
    if (Team) return res.status(409).send("Team Name/Email Already Exists");
    const set = generateSet(await Teams.countDocuments());
    const password = await bcrypt.hash(req.body.password, 10);
    Team = new Teams({
      teamName: team,
      set,
      joinCode: randomCode(),
      leader: {
        name,
        email,
        number,
      },
      answers: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      password,
    });
    await Team.save();
    return res.status(201).send("Team Created");
  } catch (err) {
    console.log(err);
  }
};

exports.join = async (req: req, res: Response) => {
  const code = req.body.code;
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  try {
    const Team = await Teams.findOne({ joinCode: code });
    if (Team == null) return res.status(400).send("Incorrect Team Code");
    if (Team.members.length >= 3) return res.status(400).send("Team is Full");
    await Teams.updateOne(
      { joinCode: code },
      {
        $push: {
          members: { name, email, number },
        },
      }
    );
    res.status(200).send("Member Added");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req: req, res: Response) => {
  console.log(1)
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
    res.status(500).send(err);
  }
};

exports.view = async (req: req, res: Response) => {
  try {
    const teams = await Teams.find(
      {},
      { joinCode: 0, members: 0, answers: 0, password: 0, set: 0 }
    ).sort({ score: -1 });
    res.status(200).send(teams);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.changeScore = async (req: req, res: Response) => {
  const ans = req.ans;
  return ans ? res.send('Correct') : res.send('Incorrect')
};

exports.verifyAnswer = async (req: req, res: Response, next: NextFunction) => {
  const quesNumber = req.body.ques;
  const answer = req.body.ans;
  const id = req.team.team;
  try {
    const team = await Teams.findOne(
      { _id: id },
      { members: 0, password: 0, leader: 0 }
    );

    if (team) {
      const set = team.set;
      const questions = await axios.get(`${quesURL}/${set}`);
      if (questions) {
        if (questions.data.questions[quesNumber].ans === answer) {
          req.ans = true;
          next()
        }
        else {
          req.ans = false;
          next()
        }
      } else return res.sendStatus(500);
    } else return res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err);
  }
}

