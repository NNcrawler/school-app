'use strict';
const express = require('express');
const router = express.Router();
const Models = require('../models');

router.get('/',(req,res)=>{
  Models.Student.findAll().then((students)=>{
    let dataPassed = {};
    dataPassed.students = students;
    res.render('students', {dataPassed})
  })
})

router.get('/add',(req,res)=>{
  res.render('students-add',{})
})

router.post('/add', (req, res)=>{
  let properties = {}
  properties.first_name = req.body.first_name;
  properties.last_name = req.body.last_name;
  properties.email = req.body.email;
  Models.Student.create(properties).then((student)=>{
    res.redirect('/students');
  }).catch((err)=>{
    let dataPassed={};
    dataPassed.err = err == 'SequelizeUniqueConstraintError: Validation error'? 'email sudah dipakai':'email tidak valid';
    res.render('students-add',dataPassed);
  })
})

router.get('/delete/:id', (req, res)=>{
  Models.Student.findById(req.params.id).then((student)=>{
    return student.destroy({ force: true })
  }).then(()=>{
    res.redirect('/students');
  })
})

router.get('/edit/:id', (req, res)=>{
  Models.Student.findById(req.params.id).then((student)=>{
    let dataPassed = {};
    console.log(student.getFullName());
    dataPassed.student = student;
    res.render('students-edit', dataPassed);
  })
})

router.post('/edit/:id', (req, res)=>{
  Models.Student.findById(req.params.id).then((student)=>{
    student.first_name = req.body.first_name;
    student.last_name = req.body.last_name;
    student.email = req.body.email;
    student.save().then(()=>{
      res.redirect('/students')
    })

  })
})

router.get('/:studentId/addsubject', (req, res)=>{
  Models.Subject.findAll({attribute:['id', 'subject_name']}).then((subjects)=>{
    let dataPassed = {
      subjects,
      StudentId:req.params.studentId
    }
    res.render('students-subjects-add', dataPassed)
    //res.send(subjects)
  })
})

router.post('/:studentId/addsubject', (req, res)=>{

  Models.Student.findById(req.params.studentId).then((student)=>{
    //res.send(student)
    return student.setSubject(parseInt(req.body.subject))
  }).then(()=>{
    res.redirect('/students')
  })
})

module.exports = router;
