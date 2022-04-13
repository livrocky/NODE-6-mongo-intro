require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usersRoutes = require('./api/users');

const app = express();
const PORT = process.env.PORT || 5000;

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
