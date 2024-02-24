import { useSelector } from 'react-redux';
import { useGetTasksQuery } from './services/task';
import {
  selectTasks,
  selectView,
  setColumns,
  setTasks,
  switchView,
  updateTask,
} from './features/tasks/taskSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './components/Column';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStatusClasses } from './utils/getClassNames';

const App = () => {
  const { data, isLoading, error, isSuccess } = useGetTasksQuery();
  const tasks = useSelector(selectTasks);
  const viewAs = useSelector(selectView);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTasks(data));

      dispatch(setColumns());
      setLoading(false);
    }
  }, [data, dispatch, isSuccess]);

  const handleDragEnd = (result: DropResult) => {
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
        status: destination.droppableId.toLowerCase(),
        index: destination.index,
      })
    );

    dispatch(setColumns());
  };

  if (isLoading || loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <div className='container max-w-[1200px] mx-auto w-[90%]'>
      <h1 className='text-2xl my-4 font-semibold'>Taskify 🚀</h1>

      <div className='flex rounded-md bg-gray-100 w-fit p-2 items-center gap-2'>
        <button
          onClick={() => dispatch(switchView())}
          className={`p-2 px-4 text-xs rounded-md ${
            viewAs === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 '
          }`}
        >
          Table
        </button>
        <button
          onClick={() => dispatch(switchView())}
          className={`p-2 px-4 text-xs rounded-md ${
            viewAs !== 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 '
          }`}
        >
          Kanban
        </button>
      </div>
      {viewAs === 'table' ? (
        <Table className='my-8'>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Title </TableHead>
              <TableHead>Description </TableHead>
              <TableHead>Start date </TableHead>
              <TableHead>Due date </TableHead>
              <TableHead>Status </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {new Date(task.start_date).toDateString()}
                </TableCell>
                <TableCell>{new Date(task.due_date).toDateString()}</TableCell>
                <TableCell className={`uppercase`}>
                  <span
                    className={`${getStatusClasses(
                      task.status
                    )} p-1 text-xs w-[84px] rounded-md block text-center font-medium`}
                  >
                    {task.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-3 gap-4 my-4'>
            <Column title='todo' />
            {/* <Column title='Backlog' /> */}
            <Column title='pending' />
            <Column title='completed' />
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default App;
