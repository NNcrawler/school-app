'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Subject.associate = function (models) {
    Subject.hasMany(models.Teacher);
    Subject.belongsToMany(models.Student, {as:'Student', through: 'StudentSubjectRelations'});
    Subject.hasMany(models.StudentSubjectRelation, {as:'SubjectStudent'});
  }
  return Subject;
};
