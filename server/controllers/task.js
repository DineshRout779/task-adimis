const db = require('../models');
const Task = db.Task;

/**
 * GET /api/tasks - Retrieve all tasks
 */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({
      message: 'Tasks fetched successfully',
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/tasks/:id - Retrieve a specific task by ID
 */
exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json({
      message: 'Task fetched successfully!',
      data: task,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * POST /api/tasks - Create a new task
 */
exports.createTask = async (req, res) => {
  const { title, description, start_date, due_date, status } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      start_date,
      due_date,
      status,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * PUT /api/tasks/:id - Update an existing task
 */
exports.editTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, start_date, due_date, status } = req.body;
  try {
    const [updatedRowsCount, updatedRows] = await Task.update(
      { title, description, start_date, due_date, status },
      { returning: true, where: { id: taskId } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json({
      message: 'Task updated successfully',
      data: updatedRows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * DELETE /api/tasks/:id - Delete a task by ID
 */
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedRowCount = await Task.destroy({ where: { id: taskId } });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
