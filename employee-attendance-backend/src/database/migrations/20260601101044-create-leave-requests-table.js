'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leave_requests', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },

      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      startDate: Sequelize.DATEONLY,

      endDate: Sequelize.DATEONLY,

      leaveType: Sequelize.STRING,

      reason: Sequelize.TEXT,

      status: {
        type: Sequelize.STRING,
        defaultValue: 'PENDING',
      },

      remarks: Sequelize.TEXT,

      approvedBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      createdAt: Sequelize.DATE,

      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('leave_requests');
  },
};