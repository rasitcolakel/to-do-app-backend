const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: String,
  /*
  Status:
    -> 0 -> not finished
    -> 1 -> finished
  */
  status: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Todo = mongoose.model("Todos", todoSchema);
module.exports = Todo;
