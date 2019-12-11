var express = require('express');

//initialise express
var app = express();

//When you get request to this route execute this function
app.get('/', function(req, res) {
    res.send('Hello from my library app');
})

//listen on the port
app.listen(3000, function() {
    console.log('Listening on port 3000');
});