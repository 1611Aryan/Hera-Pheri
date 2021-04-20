const Questions = require("./../Models/questions.model");
import { Request, Response, } from "express-serve-static-core";

exports.getAll = async (req: Request, res: Response) => {
  try {
    const questions = await Questions.find();
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getBySet = async (req: Request, res: Response) => {
  const set = req.params.set.toUpperCase();
  try {
    const questions = await Questions.findOne({ set });
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.add = async (req: Request, res: Response) => {
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
