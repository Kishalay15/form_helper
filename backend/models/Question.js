import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "multiple-choice", "dropdown", "checkbox"],
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
