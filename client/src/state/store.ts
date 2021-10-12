import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './todosSlice';
import { getAllTasksAsync } from './todosSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

store.dispatch(getAllTasksAsync());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
