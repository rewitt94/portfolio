// pull in express
var express = require('express');
var app = express();

// link in these directories
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/script'));
app.use(express.static(__dirname + '/submarine'));
app.use(express.static(__dirname + '/lmi'));

// send file to browser
app.get('/',function(req,res){
  res.sendFile(__dirname + '/view/index.html');
});

app.get('/iCV',function(req,res){
  res.sendFile(__dirname + '/view/iCV.html');
});

app.get('/blog',function(req,res){
  res.sendFile(__dirname + '/view/blog.html');
});

app.get('/apps',function(req,res){
  res.sendFile(__dirname + '/view/apps.html');
});

app.get('/contact',function(req,res){
  res.sendFile(__dirname + '/view/contact.html');
});

app.get('/submarine',function(req,res){
  res.sendFile(__dirname + '/submarine/submarine.html');
});

app.get('/lmi',function(req,res){
  res.sendFile(__dirname + '/lmi/questions.html');
});

// 0 is node binary
// 1 is .js file
// extra stuff starts from 2
const port = parseInt(process.argv[2]) || 4000;

// local port listen
app.listen(port)

console.log(`Running on port ${port}`)
