'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const teachers = require('./routes/teachers');
const subjects = require('./routes/subjects');
const students = require('./routes/students');

let app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);
app.get('/', (req, res)=>{
  res.render('home',{pageTitle:'Home'});
})

app.listen(3000);

//const express = require('express');
