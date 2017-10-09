var isLogin = function(req, res, next){
  if(req.session.isLogin==true){
    console.log('logged in');
    next()
  }else{
    res.redirect('/login')
    console.log('not logged in');
  }
  //next()
}
module.exports = isLogin;
