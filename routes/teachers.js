'use strict';

const express = require('express');
const models = require('../models');
var router = express.Router();

router.get('/', (req, res)=>{
  models.Teacher.findAll().then((teachers)=>{
    let passedData ={};
    let teachersTemp = []
    for(let teacherObj of teachers){
      let teacher = teacherObj;
      teachersTemp.push(teacher)
    }
    passedData.teachers=teachersTemp;
    res.render('teachers', {passedData});
  })
});



module.exports = router;
