'use strict';

const express = require('express');
const Models = require('../models');
var router = express.Router();
const accessLevel = require('../helpers/accessLevel');

let permission = function(req,res,next){
  accessLevel(req, res, next, 'teachers');
}
router.use(permission);

router.get('/', (req, res)=>{
  let promiseChains = [
    Models.Teacher.findAll({
      order :['first_name'],
      include: Models.Subject
    }),
    Models.Subject.findAll()
  ]

  Promise.all(promiseChains).then((values)=>{
    let teachers = values[0];
    let subjects = values[1];

    let passedData ={};
    passedData.pageTitle = 'Teachers'
    let teachersTemp = []
    for(let teacherObj of teachers){
      let teacher = teacherObj;
      //console.log(teacher);
      teachersTemp.push(teacher)
    }
    passedData.subjects=subjects;
    passedData.teachers=teachersTemp;
    passedData.role = req.session.role;
    //console.log(passedData.teachers[17]);
    res.render('teachers', {passedData});
  })
});

router.post('/', (req, res)=>{
  let inputParams = {
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email
  };
  if(req.body.SubjectId!=''){
    inputParams.SubjectId=req.body.SubjectId
  }
  Models.Teacher.create(inputParams).then((teacher)=>{
    res.redirect('/teachers');
  })
})

router.get('/delete/:id', (req, res)=>{
  Models.Teacher.findById(req.params.id).then((teacher)=>{
    return teacher.destroy({ force: true })
  }).then(()=>{
    res.redirect('/teachers');
  })
})

router.get('/edit/:id', (req, res)=>{
  let promiseChains = [Models.Teacher.findById(req.params.id, {
    include: Models.Subject
    }),
    Models.Subject.findAll()
  ]

  Promise.all(promiseChains).then((values)=>{
    let teacher = values[0];
    let subjects = values[1];
    //console.log(teacher);
    let dataPassed = {
      role:req.session.role,
      teacher,
      subjects,
      pageTitle:'Teachers-edit'
    }
    res.render('teachers-edit', dataPassed)
  })
})

router.post('/edit/:id', (req, res)=>{
  Models.Teacher.findById(req.params.id).then((teacher)=>{
    //console.log(teacher);
    teacher.first_name= req.body.first_name;
    teacher.last_name = req.body.last_name;
    teacher.email = req.body.email;
    teacher.SubjectId = req.body.SubjectId;
    return teacher.save()
  }).then(()=>{
    res.redirect('/teachers');
  })
})

module.exports = router;
