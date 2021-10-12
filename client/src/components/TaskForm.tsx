import { useState } from 'react';
import { createTaskAsync } from '../state/todosSlice';
import { useAppDispatch } from '../state/hooks';
const TaskForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(createTaskAsync({ name }));
    setName('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Add new Task'
        />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default TaskForm;
