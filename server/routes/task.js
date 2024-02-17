const {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  editTask,
} = require('../controllers/task');

const router = require('express').Router();

// get all tasks
router.get('/', getTasks);

// get a task
router.get('/:id', getTaskById);

// create a task
router.post('/', createTask);

// edit a task
router.put('/:id', editTask);

// delete a task
router.delete('/:id', deleteTask);

module.exports = router;
