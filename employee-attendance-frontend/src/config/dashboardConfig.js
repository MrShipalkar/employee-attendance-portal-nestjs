import {
  Groups,
  SupervisorAccount,
  Badge,
  CheckCircle,
  Cancel,
  EventNote,
} from '@mui/icons-material';

export const dashboardConfig = {
  ADMIN: {
    title: 'Admin Dashboard',
    cards: stats => [
      {
        title: 'Total Employees',
        value: stats.totalEmployees,
        icon: Groups,
        color: '#2563eb',
      },
      {
        title: 'Total Managers',
        value: stats.totalManagers,
        icon: SupervisorAccount,
        color: '#7c3aed',
      },
      {
        title: 'Total HR',
        value: stats.totalHR,
        icon: Badge,
        color: '#0891b2',
      },
      {
        title: 'Present Today',
        value: stats.todayPresent,
        icon: CheckCircle,
        color: '#16a34a',
      },
      {
        title: 'Absent Today',
        value: stats.todayAbsent,
        icon: Cancel,
        color: '#dc2626',
      },
      {
        title: 'Pending Leaves',
        value: stats.pendingLeaves,
        icon: EventNote,
        color: '#f59e0b',
      },
    ],
  },

  HR: {
    title: 'HR Dashboard',
    cards: stats => [
      {
        title: 'Employees',
        value: stats.totalEmployees,
        icon: Groups,
        color: '#2563eb',
      },
      {
        title: 'Present Today',
        value: stats.todayPresent,
        icon: CheckCircle,
        color: '#16a34a',
      },
      {
        title: 'Absent Today',
        value: stats.todayAbsent,
        icon: Cancel,
        color: '#dc2626',
      },
      {
        title: 'Pending Leaves',
        value: stats.pendingLeaves,
        icon: EventNote,
        color: '#f59e0b',
      },
    ],
  },

  MANAGER: {
    title: 'Manager Dashboard',
    cards: stats => [
      {
        title: 'Team Members',
        value: stats.teamMembers,
        icon: Groups,
        color: '#2563eb',
      },
      {
        title: 'Present Today',
        value: stats.todayPresent,
        icon: CheckCircle,
        color: '#16a34a',
      },
      {
        title: 'Absent Today',
        value: stats.todayAbsent,
        icon: Cancel,
        color: '#dc2626',
      },
      {
        title: 'Pending Leaves',
        value: stats.pendingLeaves,
        icon: EventNote,
        color: '#f59e0b',
      },
    ],
  },
};