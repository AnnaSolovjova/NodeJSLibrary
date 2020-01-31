/* eslint-disable camelcase */
/* This file is an application starting point. This is declared in package.json */

const express = require('express');
const chalk = require('chalk'); // Coloring console messages e.g chalk.green(string)
const debug = require('debug')('app'); // set DEBUG=app & node app.js
const morgan = require('morgan'); // Web traffic log
const path = require('path');
// initialise express
const app = express();
const port = process.env.PORT || 3000;
const book_router = require('./src/routes/bookRoutes');// encapsulates all the routes


// Middlewares
app.use(morgan('combined'));
// Look for styles and scripts in here first
// express.static lets node.js know where to look for static files
app.use(express.static(path.join(__dirname, 'public')));
// For static files that we get through npm use these folders - easy to update versions
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));


app.set('views', path.join(__dirname, 'src', '/views'));
// Have to tell express what view engine to use
app.set('view engine', 'ejs');


// Every route starting with 'books' going through this 'book_router' router
app.use('/books', book_router);

// When you get request to this route execute this function
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }
      ],
      title: 'Library'
    }
  ); // Render the  view called index
});


// Listen on the port
app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
