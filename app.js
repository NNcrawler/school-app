'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const teachers = require('./routes/teachers');
const subjects = require('./routes/subjects');
const students = require('./routes/students');
const login = require('./routes/login');
const home = require('./routes/home');
const session = require('express-session');
const isLogin = require('./helpers/isLogin');

let app = express();

app.use(session({
  secret:'lively-cat',
  resave:false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/login', login);
app.use(isLogin)

app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);
app.use('/', home);


app.listen(3000);

//const express = require('express');
