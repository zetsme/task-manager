import TaskFooter from './components/TaskFooter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
      <TaskFooter />
    </div>
  );
};

export default App;
