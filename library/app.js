var express = require('express');
var chalk = require('chalk'); // Coloring console messages e.g chalk.green(string)
var debug = require('debug')('app');//set DEBUG=app & node app.js
var morgan = require('morgan');//Web traffic log 
var path = require('path');

//initialise express
var app = express();

//Middlewares
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules','bootstrap','dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules','bootstrap','dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules','jquery','dist')));

//When you get request to this route execute this function
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));//__dirname location of current executable
})

//listen on the port
app.listen(3000, function() {
    debug(`Listening on port ${chalk.green('3000')}`);
});