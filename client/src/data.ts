export type TaskType = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Data = {
  tasks: { [taskId: string]: TaskType };
  columns: { [columnId: string]: Column };
  columnOrder: string[];
};

const data: Data = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Clean room' },
    'task-3': { id: 'task-3', content: 'Charge phone' },
    'task-4': { id: 'task-4', content: 'Cook breakfast' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Completed',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['column-1', 'column-2'],
};

export default data;