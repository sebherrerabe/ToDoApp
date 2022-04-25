const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  completed: {
    type: Boolean
  },
  id: {
    type: String,
  },
  index: {
    type: Number,
    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task, TaskSchema };
