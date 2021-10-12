import { useAppSelector } from '../state/hooks';
import { deleteTaskAsync, toggleCompleteAsync } from '../state/todosSlice';
import { useAppDispatch } from '../state/hooks';
const TaskList = () => {
  const dispatch = useAppDispatch();
  const { checkoutState, errorMessage, data: tasks } = useAppSelector((state) => state.tasks);
  if (checkoutState === 'LOADING') {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      {errorMessage && <h1>Error: {errorMessage}</h1>}

      {tasks.length ? (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task._id}>
                <input
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => dispatch(toggleCompleteAsync(task._id))}
                />
                <span>{task.name}</span>
                <span>Created At: {new Date(task.createdAt).toLocaleString()}</span>
                <button onClick={() => dispatch(deleteTaskAsync(task._id))}>Delete</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1>No Tasks in your List</h1>
      )}
    </>
  );
};

export default TaskList;
