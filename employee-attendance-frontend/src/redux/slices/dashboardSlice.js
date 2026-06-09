import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {
  getAdminDashboard,
  getHRDashboard,
  getManagerDashboard,
  getEmployeeDashboard,
} from '../../api/dashboardService';

export const fetchDashboard =
  createAsyncThunk(
    'dashboard/fetchDashboard',

    async (role) => {
      switch (role) {
        case 'ADMIN':
          return await getAdminDashboard();

        case 'HR':
          return await getHRDashboard();

        case 'MANAGER':
          return await getManagerDashboard();

        case 'EMPLOYEE':
          return await getEmployeeDashboard();

        default:
          return null;
      }
    },
  );

const dashboardSlice =
  createSlice({
    name: 'dashboard',

    initialState: {
      stats: null,
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers:
      builder => {
        builder

          .addCase(
            fetchDashboard.pending,
            state => {
              state.loading =
                true;

              state.error =
                null;
            },
          )

          .addCase(
            fetchDashboard.fulfilled,
            (
              state,
              action,
            ) => {
              state.loading =
                false;

              state.stats =
                action.payload;
            },
          )

          .addCase(
            fetchDashboard.rejected,
            (
              state,
              action,
            ) => {
              state.loading =
                false;

              state.error =
                action.error.message;
            },
          );
      },
  });

export default dashboardSlice.reducer;