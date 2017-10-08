'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubjectRelation = sequelize.define('StudentSubjectRelation', {
    score:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  StudentSubjectRelation.associate = function (models) {

  }
  return StudentSubjectRelation;
};
