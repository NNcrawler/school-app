'use strict';
const getFullName = require('../helpers/getFullName');

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subject);
  };

  Teacher.prototype.getFullName=function(){
    return getFullName(this.first_name, this.last_name);
  };

  return Teacher;
};
