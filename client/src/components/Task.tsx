import { Task } from '@/features/tasks/taskSlice';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable draggableId={task.id.toString()} key={index} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='p-4 rounded-md shadow-sm bg-white my-2'
          key={task.id}
        >
          <p> {task.title}</p>
          <small>{task.description}</small>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
