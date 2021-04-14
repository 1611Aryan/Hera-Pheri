export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    teamName: { type: String, required: true },
    joinCode: { type: String },
    set: { type: String, required: true },
    score: { type: Number, default: 0 },
    hints: { type: Number, default: 3 },
    leader: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      number: { type: String, required: true },
    },
    members: {
      type: Array,
      maxItems: 3,
    },
    password: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
    },
    /*
     *  Date and time when Team was created
     *  Members joined
     *  Transaction History
     */
    logs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Teams = mongoose.model("Teams", teamSchema);

module.exports = Teams;
