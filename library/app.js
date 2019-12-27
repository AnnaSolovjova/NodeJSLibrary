const express = require('express');
const chalk = require('chalk'); // Coloring console messages e.g chalk.green(string)
const debug = require('debug')('app'); // set DEBUG=app & node app.js
const morgan = require('morgan'); // Web traffic log
const path = require('path');
// initialise express
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan('combined'));
// Look for styles and scripts in here first
// express.static lets node.js know where to look for static files
app.use(express.static(path.join(__dirname, 'public')));
// For static files that we get through npm use these folders - easy to update versions
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

// When you get request to this route execute this function
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));// __dirname location of current executable
});

// Listen on the port
app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
