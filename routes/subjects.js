const express = require('express');
const Models = require('../models');
const scoreClassification = require('../helpers/score-classification');
const accessLevel = require('../helpers/accessLevel');
var router = express.Router();

let permission = function(req,res,next){
  accessLevel(req, res, next, 'subjects');
}
router.use(permission);
router.get('/', (req, res)=>{
  Models.Subject.findAll({include:Models.Teacher}).then((subjects)=>{
    //console.log(subjects);
    let dataPassed = {};
    dataPassed.role = req.session.role;
    dataPassed.pageTitle='subjects'
    dataPassed.subjects = subjects;
    console.log(subjects[0].Teachers[0].getFullName());
    res.render('subjects', {dataPassed})
  });
})

router.get('/:id/enrolledstudents', (req, res)=>{
  Models.Subject.findById(req.params.id,
    {
      order:[[Models.Student, 'first_name']],
      include:[
        {
          model:Models.Student,

          as:'Student',
          include:[
            {
              model:Models.StudentSubjectRelation,
              attributes:['id', 'score'],
              as:'StudentSubject',
              where:{SubjectId:req.params.id}
            }
          ]
        }
      ]
    }
  )
  .then((subject)=>{
    console.log(subject.Student[1].StudentSubject);
    let dataPassed = {subject}
    dataPassed.pageTitle = 'Enrolled Students'
    dataPassed.role = req.session.role;
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
  dataPassed.role = req.session.role;
  res.render('subjects-givescore',dataPassed);
})

router.post('/:id/givescore', (req, res)=>{
  Models.StudentSubjectRelation.find({where:{id:req.params.id}})
  .then((studentSubjectRelation)=>{
    studentSubjectRelation.score=req.body.score;
    studentSubjectRelation.save();
    res.redirect(`/subjects/${req.params.id}/givescore`);
    //console.log(studentSubjectRelation);
  })
  //res.send(req.body.score)
})

module.exports = router;
