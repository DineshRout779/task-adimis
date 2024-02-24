import { createSlice } from '@reduxjs/toolkit';
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
  viewAs: 'table' | 'kanban';
};

const initialState: InitialState = {
  tasks: [],
  columns: [],
  viewAs: 'kanban',
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    updateTask: (state, action) => {
      console.log(action.payload);

      state.tasks = state.tasks.map((task: Task) => {
        console.log('values', Number(task.id) == action.payload.id);

        if (Number(task.id) == action.payload.id) {
          console.log('happening');
          return {
            ...task,
            status: action.payload.status,
          };
        }
        console.log('no');
        return task;
      });
    },
    switchView: (state) => {
      state.viewAs = state.viewAs === 'table' ? 'kanban' : 'table';
    },
  },
});

export const { setTasks, setColumns, updateTask, switchView } =
  taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectColumns = (state: RootState) => state.tasks.columns;
export const selectView = (state: RootState) => state.tasks.viewAs;

export default taskSlice.reducer;
