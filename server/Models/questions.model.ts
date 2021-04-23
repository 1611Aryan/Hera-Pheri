export { };
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    set: { type: String, required: true, unique: true, uppercase: true },
    questions: { type: [{}] },
    specialQuestion: { type: Number },
    img: { type: String }
  },
  {
    collection: "question-bank",
  },
  { timestamps: true }
);

const Questions = mongoose.model("question-bank", questionSchema);

module.exports = Questions;
