'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'role_permissions',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        roleId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },

        permissionId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'permissions',
            key: 'id',
          },
          onDelete: 'CASCADE',
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

    await queryInterface.addConstraint(
      'role_permissions',
      {
        fields: [
          'roleId',
          'permissionId',
        ],
        type: 'unique',
        name:
          'unique_role_permission',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      'role_permissions',
    );
  },
};