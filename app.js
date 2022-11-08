//default code
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + '/date.js');

const app = express();

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = ['work', 'work2', 'work3'];


app.set('view engine', 'ejs');  //ejs documentation on how to get started

app.use(bodyParser.urlencoded({extended: true})); //to use html form data
app.use(express.static('public'));

app.get('/about', function(req, res) {
  res.render('about');
})

app.get('/', function(req, res) {
  const day = date.getDate();
  res.render('list', { listTitle: day, newListItem: items})
})

app.get('/work', function(req, res) {
  res.render('list', {listTitle: "Work", newListItem: workItems})
})

app.post('/', function(req, res) {
  const item = req.body.newItem;

  if( req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
