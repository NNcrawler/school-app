const express = require('express');
const models = require('../models');
var router = express.Router();

router.get('/', (req, res)=>{
  models.Subject.findAll().then((subjects)=>{
    let dataPassed = {};
    dataPassed.subjects = subjects
    res.render('subjects', {dataPassed})
  });
})

module.exports = router;
