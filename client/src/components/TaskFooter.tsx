import { useAppSelector } from '../state/hooks';
import { getTotalTasks, getTotalCompleteTasks } from '../state/todosSlice';

const TaskFooter = () => {
  const totalTasks = useAppSelector(getTotalTasks);
  const totalCompletedTasks = useAppSelector(getTotalCompleteTasks);
  return (
    <footer>
      <h4>TaskFooter</h4>
      <p>Total Tasks: {totalTasks}</p>
      <p>Total Completed Tasks: {totalCompletedTasks}</p>
    </footer>
  );
};

export default TaskFooter;
