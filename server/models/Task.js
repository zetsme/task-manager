import mongoose from 'mongoose';

const TaskScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [30, 'Task name must be less than 30 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model('Task', TaskScheme);
export default TaskModel;
