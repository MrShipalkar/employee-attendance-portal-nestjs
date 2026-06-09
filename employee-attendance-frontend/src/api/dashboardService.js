import api from './axios';

export const getAdminDashboard =
  async () => {
    const response =
      await api.get(
        '/dashboard/admin',
      );

    return response.data;
  };

  export const getManagerDashboard =
  async () => {
    const response =
      await api.get(
        '/dashboard/manager',
      );

    return response.data;
  };

export const getHRDashboard =
  async () => {
    const response =
      await api.get(
        '/dashboard/hr',
      );

    return response.data;
  };

  export const getEmployeeDashboard =
  async () => {
    const response =
      await api.get(
        '/dashboard/employee',
      );

    return response.data;
  };