export {};
const Teams = require("./../Models/team.model");
const bcrypt = require("bcrypt");

interface res {
  status: (i: number) => { send };
  send: (i: any) => {};
  sendStatus: (i: number) => {};
}

const randomCode = () => Math.random().toString(36).substring(2, 10);

exports.create = async (req: any, res: res) => {
  const team = req.body.team;
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  try {
    let Team = await Teams.findOne({
      $or: [{ teamName: team }, { "leader.email": email }],
    });
    if (Team) return res.status(409).send("Team Name/Email Already Exists");
    const password = await bcrypt.hash(req.body.password, 10);
    Team = new Teams({
      teamName: team,
      joinCode: randomCode(),
      leader: {
        name,
        email,
        number,
      },
      password,
    });
    await Team.save();
    return res.status(201).send("Team Created");
  } catch (err) {
    console.log(err);
  }
};

exports.join = async (req: any, res: res) => {
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

exports.login = async (req: any, res: res) => {
  const teamName = req.body.team;
  const password = req.body.password;
  try {
    const team = await Teams.findOne({ teamName });
    if (team) {
      if (await bcrypt.compare(password, team.password)) {
        return res.status(202).send({
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
