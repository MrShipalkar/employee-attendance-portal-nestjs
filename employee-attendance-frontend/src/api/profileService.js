import api from './axios';

export const getMyProfile =
  async () => {
    const response =
      await api.get('/users/me');

    return response.data;
  };

export const updateMyProfile =
  async (data) => {
    const response =
      await api.patch(
        '/users/me',
        data,
      );

    return response.data;
  };

export const uploadProfilePicture =
  async (file) => {
    const formData =
      new FormData();

    formData.append(
      'profilePicture',
      file,
    );

    const response =
      await api.patch(
        '/users/me/profile-picture',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        },
      );

    return response.data;
  };