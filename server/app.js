require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/task');
const db = require('./models');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Database connection
db.sequelize
  .sync()
  .then(() => {
    console.log(chalk.bgGreen('Synced db.'));
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// routes
app.get('/', (req, res) => {
  return res.status(200).send('API is working...✅');
});
app.use('/api/v1/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
