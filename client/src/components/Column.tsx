import { Droppable } from '@hello-pangea/dnd';
import {
  Column as ColumnType,
  selectColumns,
} from '../features/tasks/taskSlice';
import Task from './Task';
import { useSelector } from 'react-redux';

const Column = ({ title }: { title: string }) => {
  const columns = useSelector(selectColumns);
  const column = columns.find(
    (column: ColumnType) => column.title === title.toLowerCase()
  ) || { title, tasks: [] };

  return (
    <div className='p-4 bg-sky-100 rounded-lg shadow'>
      <h1 className='text-xl font-semibold capitalize'>{title}</h1>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            className='h-full'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column?.tasks.map((task, index) => (
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
