import { TaskType } from '@/data';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index }: { task: TaskType; index: number }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='p-4 rounded-md shadow-sm bg-white my-2'
          key={task.id}
        >
          {task.content}
        </li>
      )}
    </Draggable>
  );
};

export default Task;
