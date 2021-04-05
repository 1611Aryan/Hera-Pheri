export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    set: { type: String, required: true, unique: true, uppercase: true },
    questions: { type: [{}] },
  },
  {
    collection: "question-bank",
  },
  { timestamps: true }
);

const Questions = mongoose.model("question-bank", questionSchema);

module.exports = Questions;
