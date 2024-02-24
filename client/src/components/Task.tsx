import { Task } from '@/features/tasks/taskSlice';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div
          title={`${task.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='p-4 rounded-md shadow-sm bg-white my-2'
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
