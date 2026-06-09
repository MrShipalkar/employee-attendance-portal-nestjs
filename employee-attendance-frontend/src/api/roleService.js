import api from './axios';

export const getRoles = async () => {
  const response =
    await api.get('/roles');

  return response.data;
};