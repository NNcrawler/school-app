'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'salt', Sequelize.STRING)
    .then(()=>{
      queryInterface.addConstraint('Users', ['salt'], {
        type: 'unique',
        name: 'saltUnique'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'salt')
  }
};
