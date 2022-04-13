const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
const { port } = require('./config');

const app = express();
app.listen(port, () => console.log('express is online', port));
