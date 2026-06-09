import api from './axios';

export const loginUser = async (
  username,
  password,
) => {
  const response = await api.post(
    '/auth/login',
    {
      username,
      password,
    },
  );

  return response.data;
};

export const getProfile =
  async () => {
    const response =
      await api.get('/auth/profile');

    return response.data;
  };

export const logoutUser =
  async () => {
    const response =
      await api.post('/auth/logout');

    return response.data;
  };


export const logout = async () => {
  const response =
    await api.post(
      '/auth/logout',
    );

  return response.data;
};

export const changePassword =
  async (data) => {
    const response =
      await api.post(
        '/auth/change-password',
        data,
      );

    return response.data;
  };

  export const sendChangePasswordOtp =
  async () => {
    const response =
      await api.post(
        '/auth/send-change-password-otp',
      );

    return response.data;
  };