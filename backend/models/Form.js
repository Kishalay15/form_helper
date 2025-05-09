import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model("Form", FormSchema);
export default Form;
