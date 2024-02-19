import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type Task = {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  due_date: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tasks = {
  tasks: Task[];
};

const initialState: Tasks = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export const {} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
