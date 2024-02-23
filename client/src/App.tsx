import { useSelector } from 'react-redux';
import { useGetTasksQuery } from './services/task';
import {
  Column as ColumnType,
  Task,
  selectColumns,
  selectTasks,
  setColumns,
  setTasks,
  updateTask,
} from './features/tasks/taskSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './components/Column';

const App = () => {
  const { data, isLoading, error, isSuccess } = useGetTasksQuery();
  const tasks = useSelector(selectTasks);
  const columns = useSelector(selectColumns);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTasks(data));

      const columns = data.tasks.reduce((acc: ColumnType[], task: Task) => {
        const { status } = task;

        const column = acc.find((c: ColumnType) => c.title === status);

        if (!column) {
          acc.push({
            id: `column-${acc.length}`,
            title: status,
            tasks: [task],
          });
        }

        column?.tasks.push(task);
        return acc;
      }, []);

      console.log('cols: ', columns);
      dispatch(setColumns(columns));
      setLoading(false);
    }
  }, [data, dispatch, isSuccess]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    // Check if the task is dropped within the same column
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update task data (e.g., using Redux actions)
    dispatch(
      updateTask({
        id: draggableId,
        status: destination.droppableId,
        index: destination.index,
      })
    );
  };

  if (isLoading || loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <div className='container max-w-[1200px] mx-auto w-[90%]'>
      <h1 className='text-2xl my-4 font-semibold'>Taskify 🚀</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='grid grid-cols-2 gap-4 my-4'>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.title)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
