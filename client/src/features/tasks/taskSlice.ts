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

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type InitialState = {
  tasks: Task[];
  columns: Column[];
};

const initialState: InitialState = {
  tasks: [],
  columns: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      // console.log(action.payload);
      state.tasks = action.payload.tasks;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    updateTask: (state, action) => {
      console.log(action.payload);

      state.tasks = state.tasks.map((task: Task) =>
        task.id == action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );
    },
  },
});

export const { setTasks, setColumns, updateTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectColumns = (state: RootState) => state.tasks.columns;

export default taskSlice.reducer;
