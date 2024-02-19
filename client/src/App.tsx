import { useEffect, useState } from 'react';
import data from './data';
import Column from './components/Column';
import { DragDropContext } from '@hello-pangea/dnd';
import { getAllTasks } from './services/taskservices';

function App() {
  const [allTasks, setAllTasks] = useState(data.tasks);
  const [allColumns, setAllColumns] = useState(data.columns);
  const [order, setOrder] = useState(data.columnOrder);

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

        // setAllTasks(res.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className='container max-w-[1200px] mx-auto w-[90%]'>
      <h1 className='text-2xl my-4 font-semibold'>Taskify 🚀</h1>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <div className='grid grid-cols-2 gap-4 my-4'>
          {order.map((columnId: string) => {
            const column = allColumns[columnId];
            const tasks = column.taskIds.map((taskId) => allTasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
