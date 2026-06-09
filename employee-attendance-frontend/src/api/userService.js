import api from './axios';

export const getUsers = async () => {
  const response =
    await api.get('/users');

  return response.data;
};

export const createUser = async (
  userData,
) => {
  const response =
    await api.post(
      '/users',
      userData,
    );

  return response.data;
};

export const updateUser = async (
  id,
  userData,
) => {
  const response =
    await api.patch(
      `/users/${id}`,
      userData,
    );

  return response.data;
};

export const deleteUser = async (
  id,
) => {
  const response =
    await api.delete(
      `/users/${id}`,
    );

  return response.data;
};

export const assignManager = async (
  employeeId,
  managerId,
) => {
  const response =
    await api.patch(
      `/users/${employeeId}/assign-manager`,
      {
        managerId,
      },
    );

  return response.data;
};

export const removeManager = async (
  employeeId,
) => {
  const response =
    await api.patch(
      `/users/${employeeId}/remove-manager`,
    );

  return response.data;
};

export const getEmployeeDirectory =
  async () => {
    const response =
      await api.get(
        '/users/directory',
      );

    return response.data;
  };

  export const getUserById = async (
  id,
) => {
  const response =
    await api.get(
      `/users/${id}`,
    );

  return response.data;
};