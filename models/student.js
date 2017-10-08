'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type:DataTypes.STRING, validate:{isEmail: true}, unique: true}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }

    }
  });

  Student.associate = function (models) {
    Student.belongsToMany(models.Subject, {as:'Subject',through:'StudentSubjectRelation'});
    Student.hasMany(models.StudentSubjectRelation, {as:'StudentSubject'});
    //Student.belongsToMany(models.Subject, )
  }

  Student.prototype.getFullName=function() {
    return `${this.first_name} ${this.last_name}`;
  };
  return Student;
};
