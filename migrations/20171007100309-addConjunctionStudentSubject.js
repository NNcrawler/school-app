'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentSubjectRelations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SubjectId: {
        allowNull : false,
        type : Sequelize.INTEGER,
        references: {
              model: 'Subjects',
              key: 'id'
          },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      StudentId: {
        allowNull: false,
        type : Sequelize.INTEGER,
        references: {
              model: 'Students',
              key: 'id'
          },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StudentSubjectRelations');
  }
};
