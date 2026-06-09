// src/config/sidebarConfig.jsx

import {
  Dashboard,
  Group,
  AccessTime,
  EventNote,
  Security,
  Person,
} from '@mui/icons-material';

export const sidebarConfig = {
  ADMIN: [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/admin/dashboard',
    },
    {
      text: 'Users',
      icon: <Group />,
      path: '/admin/users',
    },
    {
      text: 'Attendance',
      icon: <AccessTime />,
      path: '/admin/attendance',
    },
    {
      text: 'Leaves',
      icon: <EventNote />,
      path: '/admin/leaves',
    },
    {
      text: 'Roles & Permissions',
      icon: <Security />,
      path: '/admin/roles',
    },
    {
      text: 'My Profile',
      icon: <Person />,
      path: '/profile',
    },
  ],

  HR: [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/hr/dashboard',
    },
    {
      text: 'Attendance',
      icon: <AccessTime />,
      path: '/hr/attendance',
    },
    {
      text: 'Leave Requests',
      icon: <EventNote />,
      path: '/hr/leaves',
      end: true,
    },
    {
      text: 'Apply Leave',
      icon: <EventNote />,
      path: '/hr/leaves/apply',
      end: true,
    },
    {
      text: 'My Leaves',
      icon: <EventNote />,
      path: '/hr/my-leaves',
      end: true,
    },
    {
      text: 'My Attendance',
      icon: <AccessTime />,
      path: '/hr/my-attendance',
      end: true,
    },
    {
      text: 'Employees',
      icon: <Group />,
      path: '/hr/users',
    },
    {
      text: 'My Profile',
      icon: <Person />,
      path: '/profile',
    },
  ],

  MANAGER: [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/manager/dashboard',
    },
    {
      text: 'Team Attendance',
      icon: <AccessTime />,
      path: '/manager/attendance',
    },
    {
      text: 'Team Leaves',
      icon: <EventNote />,
      path: '/manager/leaves',
      end: true,
    },
    {
      text: 'My Attendance',
      icon: <AccessTime />,
      path: '/manager/my-attendance',
      end: true,
    },
    {
      text: 'Apply Leave',
      icon: <EventNote />,
      path: '/manager/leaves/apply',
      end: true,
    },
    {
      text: 'My Leaves',
      icon: <EventNote />,
      path: '/manager/my-leaves',
      end: true,
    },
    {
      text: 'My Profile',
      icon: <Person />,
      path: '/profile',
    },
  ],

  EMPLOYEE: [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/employee/dashboard',
    },
    {
      text: 'My Attendance',
      icon: <AccessTime />,
      path: '/employee/attendance',
      end: true,
    },
    {
      text: 'Apply Leave',
      icon: <EventNote />,
      path: '/employee/leaves/apply',
      end: true,
    },
    {
      text: 'My Leaves',
      icon: <EventNote />,
      path: '/employee/leaves',
      end: true,
    },
    {
      text: 'My Profile',
      icon: <Person />,
      path: '/profile',
    },
  ],
};