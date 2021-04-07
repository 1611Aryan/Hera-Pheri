export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    auth: { type: String, default: "admin" },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "admins",
  },
  { timestamps: true }
);

const Admins = mongoose.model("admins", adminSchema);

module.exports = Admins;
