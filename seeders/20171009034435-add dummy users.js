'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users',[{
      username:'johndoe',
      password:'21fcfdcb3c39ef815f3bfdec2c6b66fe',
      role:'teacher',
      salt:'92As23oe',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:'pakdengklek',
      password:'2fbf7258c2d9687832267128d2a53b47',
      role:'academic',
      salt:'d9afDa92',
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      username:'charlesxavier',
      password:'d7bcaf10190c70c96df5b19042faf97a',
      role:'headmaster',
      salt:'j39aln3Q',
      createdAt:new Date(),
      updatedAt:new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
