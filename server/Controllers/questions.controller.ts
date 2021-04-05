const Questions = require("./../Models/questions.model");

interface res {
  send: (i: any) => { status: (i: any) => {} | {} };
  status: (i: number) => { send: (i: any) => {} | {} };
  sendStatus: (i: number) => {};
}
interface req {
  body: {
    set: string;
    questions: {
      ques: string;
      ans: string;
    }[];
  };
  params: {
    set: string;
  };
}

exports.getAll = async (req: req, res: res) => {
  try {
    const questions = await Questions.find();
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getBySet = async (req: req, res: res) => {
  const set = req.params.set.toUpperCase();
  try {
    const questions = await Questions.findOne({ set });
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.add = async (req: req, res: res) => {
  const set = req.body.set;
  const questions = req.body.questions;
  try {
    const question = new Questions({ set, questions });
    await question.save();
    res.status(202).send("Added");
  } catch (err) {
    res.status(500).send(err);
  }
};
