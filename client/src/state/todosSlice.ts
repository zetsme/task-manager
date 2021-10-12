import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState } from './store';

interface TaskInterface {
  name: string;
  completed: boolean;
  createdAt: Date;
  _id: string;
}

type CheckoutState = 'LOADING' | 'READY' | 'ERROR';
interface TasksState {
  data: TaskInterface[];
  checkoutState: CheckoutState;
  errorMessage: string | null;
}

const initialState: TasksState = {
  data: [],
  checkoutState: 'READY',
  errorMessage: null,
};

export const getAllTasksAsync = createAsyncThunk<TaskInterface[]>(
  'tasks/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/tasks');
      const { tasks } = response.data;
      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errorMessage as string);
    }
  }
);
export const createTaskAsync = createAsyncThunk(
  'tasks/createTask',
  async (obj: Pick<TaskInterface, 'name'>, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<{ task: TaskInterface }> = await axios.post(
        'http://localhost:3001/api/v1/tasks',
        obj
      );
      const { task } = response.data;
      dispatch(addTask(task));
    } catch (error: any) {
      return rejectWithValue(error.response.data.errorMessage as string);
    }
  }
);
export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (_id: TaskInterface['_id'], { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/tasks/${_id}`);
      dispatch(deleteTask(_id));
    } catch (error: any) {
      return rejectWithValue(error.response.data.errorMessage as string);
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk<any, string, { state: RootState }>(
  'tasks/toggleCompleteTask',
  async (_id: TaskInterface['_id'], { dispatch, getState, rejectWithValue }) => {
    try {
      const task = getState().tasks.data.find((task) => task._id === _id);
      if (task) {
        await axios.patch(`http://localhost:3001/api/v1/tasks/${_id}`, {
          completed: !task.completed,
        });
        dispatch(toggleComplete(_id));
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.errorMessage as string);
    }
  }
);

const setError = (state: TasksState, action: PayloadAction<any, string>) => {
  state.checkoutState = 'ERROR';
  state.errorMessage = action.payload;
};
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.errorMessage = null;
      state.data = [action.payload, ...state.data];
    },
    deleteTask: (state, action) => {
      state.errorMessage = null;
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    toggleComplete: (state, action) => {
      state.errorMessage = null;
      const toggledTask = state.data.find((task) => task._id === action.payload);
      if (toggledTask) {
        toggledTask.completed = !toggledTask.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasksAsync.pending, (state, action) => {
      state.checkoutState = 'LOADING';
    });
    builder.addCase(getAllTasksAsync.fulfilled, (state, action) => {
      state.checkoutState = 'READY';
      state.data = action.payload;
    });
    builder.addCase(getAllTasksAsync.rejected, setError);
    builder.addCase(createTaskAsync.rejected, setError);
    builder.addCase(toggleCompleteAsync.rejected, setError);
  },
});

const { addTask, deleteTask, toggleComplete } = tasksSlice.actions;

export const getTotalTasks = createSelector(
  (state: RootState) => state.tasks.data,
  (tasks) => tasks.length
);

export const getTotalCompleteTasks = createSelector(
  (state: RootState) => state.tasks.data,
  (items) => items.reduce((acc, cur) => (acc += cur.completed ? 1 : 0), 0)
);

export default tasksSlice.reducer;
