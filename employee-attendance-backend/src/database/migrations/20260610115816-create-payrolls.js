'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payrolls', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },

      employeeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      workingDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      presentDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      absentDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      grossSalary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      deductions: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      netSalary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: 'GENERATED',
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payrolls');
  },
};