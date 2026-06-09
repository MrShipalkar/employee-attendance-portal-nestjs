'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', {
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

      attendanceDate: Sequelize.DATEONLY,

      checkIn: Sequelize.DATE,

      checkOut: Sequelize.DATE,

      totalHours: Sequelize.DECIMAL(5, 2),

      createdAt: Sequelize.DATE,

      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('attendances');
  },
};