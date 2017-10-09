'use strict';
let accessPermission = function(req, res, next, page){
  if(req.session.role=='teacher'){
    if(page == 'students'){
      next();
    }else {
      res.redirect('/');
    }
  }else if(req.session.role=='academic'){
    if(page == 'teachers'){
      res.redirect('/');
    }else{
      next();
    }
  }else if(req.session.role == 'headmaster'){
    next();
  }
}

module.exports = accessPermission;
