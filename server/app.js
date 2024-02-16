require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  return res.status(200).send('API is working...✅');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
