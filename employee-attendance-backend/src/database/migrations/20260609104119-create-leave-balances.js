'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'leave_balances',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue:
            Sequelize.literal(
              'gen_random_uuid()',
            ),
        },

        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          unique: true,

          references: {
            model: 'users',
            key: 'id',
          },

          onDelete: 'CASCADE',
        },

        sickLeave: {
          type: Sequelize.INTEGER,
          defaultValue: 12,
        },

        casualLeave: {
          type: Sequelize.INTEGER,
          defaultValue: 12,
        },

        earnedLeave: {
          type: Sequelize.INTEGER,
          defaultValue: 18,
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      'leave_balances',
    );
  },
};