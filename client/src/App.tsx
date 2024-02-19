import { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { getAllTasks } from './services/taskservices';
import Column from './components/Column';
import { useGetTasksQuery } from './services/task';

function App() {
  const { data, isLoading, error } = useGetTasksQuery();
  console.log('taskz: ', data, isLoading, error);

  const [allTasks, setAllTasks] = useState(null);
  const [allColumns, setAllColumns] = useState(null);
  // const [order, setOrder] = useState(data.columnOrder);

  const handleDragStart = (result: unknown) => {
    console.log('start: ', result);
  };

  const handleDragUpdate = (result: unknown) => {
    console.log('update: ', result);
  };
  const handleDragEnd = (result: unknown) => {
    console.log('end: ', result);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllTasks();

        console.log(res);

        setAllTasks(res.data.data);

        const groupedTasks = res.data.data.reduce((acc, task) => {
          const { status } = task;
          if (!acc[status]) {
            acc[status] = {
              id: status,
              title: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter
              tasks: [],
            };
          }
          acc[status].tasks.push(task);
          return acc;
        }, {});

        console.log('columns: ', groupedTasks);

        setAllColumns(groupedTasks);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (allTasks === null || allColumns === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container max-w-[1200px] mx-auto w-[90%]'>
      <h1 className='text-2xl my-4 font-semibold'>Taskify 🚀</h1>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <div className='grid grid-cols-2 gap-4 my-4'>
          {Object.keys(allColumns).map((columnId) => (
            <Column
              tasks={allColumns[columnId].tasks}
              column={allColumns[columnId]}
              key={columnId}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
