'use strict';

module.exports = {
  async up(queryInterface) {
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name='ADMIN'`
    );

    await queryInterface.bulkInsert('users', [
      {
        firstName: 'System',
        lastName: 'Administrator',
        username: 'admin',
        email: 'admin@attendance.com',

        passwordHash:
          '$2b$10$O1dRERGrKy7viaLXasWFWO1TjkDhQU8dLN7mXPDcWwkg.wN83XTLq',

        roleId: roles[0].id,

        isActive: true,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'users',
      {
        username: 'admin',
      },
      {},
    );
  },
};