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

  const code = req.body.code.trim()
  const name = req.body.name.trim()

  if (code !== process.env.ADMIN_TOKEN) return res.status(400).send('Invalid Code')

  try {
    const admin = await Admins.findOne({ name });

    if (admin) return res.status(500).send('User Exists')
    await new Admins({
      name,
      password: await bcrypt.hash(req.body.password, 10),
    }).save()

    res.status(202).send("Created");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.verify = async (req: Request, res: Response) => {
  const name = req.body.name.trim();
  const password = req.body.password.trim();
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
