const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('home',{pageTitle:'Home', role:req.session.role});
})

module.exports = router;
