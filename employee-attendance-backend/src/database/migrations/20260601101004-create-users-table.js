'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },

      firstName: {
        type: Sequelize.STRING,
      },

      lastName: {
        type: Sequelize.STRING,
      },

      username: {
        type: Sequelize.STRING,
        unique: true,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
      },

      passwordHash: {
        type: Sequelize.TEXT,
      },

      roleId: {
        type: Sequelize.UUID,
        references: {
          model: 'roles',
          key: 'id',
        },
      },

      managerId: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};