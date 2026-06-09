import api from './axios';

export const getAllLeaves =
  async () => {
    const response =
      await api.get(
        '/leaves/all',
      );

    return response.data;
  };

export const approveLeave =
  async (
    leaveId,
    remarks = '',
  ) => {
    const response =
      await api.patch(
        `/leaves/${leaveId}/approve`,
        {
          remarks,
        },
      );

    return response.data;
  };

export const rejectLeave =
  async (
    leaveId,
    remarks = '',
  ) => {
    const response =
      await api.patch(
        `/leaves/${leaveId}/reject`,
        {
          remarks,
        },
      );

    return response.data;
  };



export const applyLeave =
  async (leaveData) => {
    const response =
      await api.post(
        '/leaves/apply',
        leaveData,
      );

    return response.data;
  };

export const getMyLeaves =
  async () => {
    const response =
      await api.get(
        '/leaves/my',
      );

    return response.data;
  };

  export const getTeamLeaves =
  async () => {
    const response =
      await api.get(
        '/leaves/team',
      );

    return response.data;
  };