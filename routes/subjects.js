const express = require('express');
const Models = require('../models');
const scoreClassification = require('../helpers/score-classification');
var router = express.Router();

router.get('/', (req, res)=>{
  Models.Subject.findAll({include:Models.Teacher}).then((subjects)=>{
    //console.log(subjects);
    let dataPassed = {};
    dataPassed.subjects = subjects;
    console.log(subjects[0].Teachers[0].getFullName());
    res.render('subjects', {dataPassed})
  });
})

router.get('/:id/enrolledstudents', (req, res)=>{
  Models.Subject.findById(req.params.id,
    {
      include:[
        {
          model:Models.Student,
          as:'Student',
          include:[
            {
              model:Models.StudentSubjectRelation,
              attributes:['id', 'score'],
              as:'StudentSubject'
            }
          ]
        }
      ]
    }
  )
  .then((subject)=>{
    let dataPassed = {subject}
    for (let isubject in subject) {
      if(subject[isubject].hasOwnProperty('Student')){
        subject[isubject].Student=subject[isubject].Student.map((student) => {
          student.scoreByLetter= scoreClassification(student.StudentSubject[0].score);
          return student});
       }
    }
    res.render('subjects-enrolledstudents', dataPassed)
  })
})

router.get('/:id/givescore', (req, res)=>{
  //Models.Subject.findById(req.params.id, {include:Models.StudentSubjectRelation, where:})
  let dataPassed = {subject:req.params.id}
  res.render('subjects-givescore',dataPassed);
})

router.post('/:id/givescore', (req, res)=>{
  Models.StudentSubjectRelation.find({where:{id:req.params.id}})
  .then((studentSubjectRelation)=>{
    studentSubjectRelation.score=req.body.score;
    studentSubjectRelation.save();
    res.redirect('/subjects');
    //console.log(studentSubjectRelation);
  })
  //res.send(req.body.score)
})

module.exports = router;
