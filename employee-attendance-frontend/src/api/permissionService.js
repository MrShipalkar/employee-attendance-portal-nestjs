import api from './axios';

export const getPermissions =
  async () => {
    const response =
      await api.get('/permissions');

    return response.data;
  };

export const getRolePermissions =
  async (roleId) => {
    const response =
      await api.get(
        `/permissions/role/${roleId}`,
      );

    return response.data;
  };

export const updateRolePermissions =
  async (
    roleId,
    permissionIds,
  ) => {
    const response =
      await api.put(
        `/permissions/role/${roleId}`,
        {
          permissionIds,
        },
      );

    return response.data;
  };