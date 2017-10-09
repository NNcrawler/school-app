'use strict';
const getFullName = require('../helpers/getFullName');
const crypto = require('crypto');
const generateRandom = require('../helpers/generateRandom');
const encrypt = require('../helpers/encrypt');

function validateUnique(users, salt){
  return new Promise((resolve, reject)=>{
    let unique = false;
    while(!unique){
      unique=true;
      for (let user of users) {
        if(user.salt==salt){
          salt=generateRandom(8)
          unique=false;
          break;
        }
      }
    }
    resolve(salt);
  })

}


module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type:DataTypes.STRING,
      validate:{notNull:true}
    },
    salt: {
      type:DataTypes.STRING,
      validate:{notNull:true}
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.associate = function (models) {

  };

  User.beforeCreate((user, options)=>{
    return new Promise((resolve, reject)=>{
      User.findAll().then(users=>{
        validateUnique(users, user.salt).then((newSalt)=>{
          user.salt = newSalt
          user.password = encrypt(user.password, user.salt)
          resolve()
        })
      })
    })
  });


  return User;
};
