import mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    teamName: { type: String, required: true, index: 'text' },
    joinCode: { type: String },
    set: { type: String, required: true },
    score: { type: Number, default: 0 },
    hints: {
      type: {}, default: {
        "type1": 1, "type2": 1, "type3": 1
      }
    },
    hintFlag: { type: {}, default: { used: false, typeUsed: null } },
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
    ques: {
      type: Number,
      default: 0
    },
    logs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Teams = mongoose.model("Teams", teamSchema);

export = Teams;
