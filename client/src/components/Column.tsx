import { Droppable } from '@hello-pangea/dnd';
import {
  Column as ColumnType,
  Task as TaskType,
} from '../features/tasks/taskSlice';
import Task from './Task';

const Column = ({
  column,
  tasks,
}: {
  column: ColumnType;
  tasks: TaskType[];
}) => {
  return (
    <div className='p-4 bg-sky-100 rounded-lg shadow'>
      <h1 className='text-xl font-semibold capitalize'>{column.title}</h1>

      <Droppable droppableId={column.title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task index={index} key={task.id} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
