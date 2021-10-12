import CustomError from '../customError.js';
import Task from '../models/Task.js';

export const getAll = async (req, res) => {
  const tasks = await Task.find({}).sort('-createdAt');
  res.status(200).json({ tasks });
};

export const createOne = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

export const getOne = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new CustomError(404, `Can't find task with id: ${taskId}`);
  }
  res.status(200).json({ task });
};

export const deleteOne = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    throw new CustomError(404, `Can't find task with id: ${taskId}`);
  }
  res.status(200).json({ task });
};

export const updateOne = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    throw new CustomError(404, `Can't find task with id: ${taskId}`);
  }
  res.status(200).json({ task });
};
