const express = require('express');
const router = express.Router();
const Models = require('../models');
const generateRandom = require('../helpers/generateRandom');
const encrypt = require('../helpers/encrypt');


router.get('/', (req, res)=>{
  if(req.session.isLogin==true){
    res.redirect('/');
  }else{
    res.render('login', {});
  }

})

router.post('/', (req, res)=>{
  let username = req.body.username;
  let password = req.body.password;
  Models.User.find({where:{username:username}}).then((user)=>{
    if(user){

      if(user.password==encrypt(password, user.salt) ){
        req.session.isLogin=true;
        req.session.role = user.role;
        req.session.username = user.username;
        res.redirect('/')
        return
      }
    }
    res.redirect('/login');

  })
})

router.get('/register', (req,res)=>{
  let role = ['teacher', 'academic', 'headmaster'];
  let dataPassed={role};
  dataPassed.pageTitle= 'Register'

  res.render('register', dataPassed);
})

router.post('/register', (req, res)=>{
  Models.User.findOrCreate({
    where:{username:req.body.username},
    defaults:{
      username:req.body.username,
      password:req.body.password,
      role:req.body.role,
      salt:generateRandom(8)
    }
  }).then((user, created)=>{

  }).catch((err)=>{

  })
  res.redirect('/login')
})

router.get('/out', (req,res)=>{
  req.session.destroy();
  res.redirect('/login');
})

module.exports = router;
