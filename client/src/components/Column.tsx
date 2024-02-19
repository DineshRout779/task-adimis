import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import { Task as TaskType } from '@/features/tasks/taskSlice';

type ColumnProps = {
  column: {
    id: string;
    tasks: TaskType[];
    title: string;
  };
  tasks: TaskType[];
};

const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <div key={column.id} className='p-4 bg-sky-100 rounded-lg shadow'>
      <h1 className='text-xl  font-semibold'>{column.title}</h1>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, i) => (
              <Task task={task} index={i} key={task.id} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
