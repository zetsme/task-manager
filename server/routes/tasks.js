import express from 'express';
import * as tasks from '../controllers/tasks.js';

const router = express.Router();

router.route('/').get(tasks.getAll).post(tasks.createOne);
router.route('/:id').get(tasks.getOne).delete(tasks.deleteOne).patch(tasks.updateOne);

export default router;
