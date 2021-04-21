const Admins = require("./../Models/admins.model");
const bcrypt = require("bcrypt");
import { Request, Response, NextFunction } from "express-serve-static-core";


exports.get = async (req: Request, res: Response) => {
  try {
    const Admin = await Admins.find();
    res.status(200).send(Admin);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create = async (req: Request, res: Response) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10),
    });
    await admin.save();
    res.status(202).send("Created");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.verify = async (req: Request, res: Response) => {
  const name = req.body.name;
  const password = req.body.password;
  try {
    const admin = await Admins.findOne({ name });
    if (admin) {
      if (await bcrypt.compare(password, admin.password))
        return res.status(200).send({ admin, auth: "admin" });
      else return res.status(401).send("Incorrect Password");
    }
    return res.status(404).send("User doesn't exist");
  } catch (err) {
    res.status(500).send(err);
  }
};
