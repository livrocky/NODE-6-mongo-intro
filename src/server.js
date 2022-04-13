const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usersRoutes = require('./api/users');
const { PORT } = require('./config');

const app = express();

// MiddleWare
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/', usersRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ err: 'not found' });
});
app.listen(PORT, () => console.log('express is online', PORT));
