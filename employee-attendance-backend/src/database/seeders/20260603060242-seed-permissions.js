'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'permissions',
      [
        // User Management
        {
          id: uuidv4(),
          name: 'USER_CREATE',
          category: 'User Management',
          description: 'Create users',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'USER_VIEW',
          category: 'User Management',
          description: 'View users',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'USER_UPDATE',
          category: 'User Management',
          description: 'Update users',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'USER_DELETE',
          category: 'User Management',
          description: 'Delete users',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Attendance
        {
          id: uuidv4(),
          name: 'ATTENDANCE_VIEW',
          category: 'Attendance',
          description: 'View attendance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'ATTENDANCE_MARK',
          category: 'Attendance',
          description: 'Mark attendance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'ATTENDANCE_EDIT',
          category: 'Attendance',
          description: 'Edit attendance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'ATTENDANCE_EXPORT',
          category: 'Attendance',
          description: 'Export attendance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Leave Management
        {
          id: uuidv4(),
          name: 'LEAVE_VIEW',
          category: 'Leave Management',
          description: 'View leaves',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'LEAVE_CREATE',
          category: 'Leave Management',
          description: 'Create leave request',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'LEAVE_APPROVE',
          category: 'Leave Management',
          description: 'Approve leave request',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'LEAVE_REJECT',
          category: 'Leave Management',
          description: 'Reject leave request',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Dashboard
        {
          id: uuidv4(),
          name: 'DASHBOARD_VIEW',
          category: 'Dashboard',
          description: 'View dashboard',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Roles & Permissions
        {
          id: uuidv4(),
          name: 'ROLE_VIEW',
          category: 'Roles & Permissions',
          description: 'View roles',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'ROLE_UPDATE',
          category: 'Roles & Permissions',
          description: 'Update roles',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'PERMISSION_UPDATE',
          category: 'Roles & Permissions',
          description: 'Update permissions',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'permissions',
      null,
      {},
    );
  },
};