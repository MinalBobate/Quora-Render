import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // answers: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Answers",
  // },
  user: Object,
});

const Question = mongoose.model("Questions", QuestionSchema);
export default Question;