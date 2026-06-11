'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_salaries', {
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
        onDelete: 'CASCADE',
      },

      basicSalary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      hra: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },

      da: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },

      specialAllowance: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },

      bonus: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },

      pfDeduction: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },

      professionalTax: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },

      tds: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
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
    await queryInterface.dropTable('employee_salaries');
  },
};