import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  column: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo',  // New tasks start in "todo" by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task
