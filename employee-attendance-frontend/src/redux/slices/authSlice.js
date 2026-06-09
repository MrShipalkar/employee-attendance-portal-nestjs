import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  user:
    JSON.parse(
      localStorage.getItem(
        'user',
      ),
    ) || null,

  token:
    localStorage.getItem(
      'token',
    ) || null,
};

const authSlice =
  createSlice({
    name: 'auth',

    initialState,

 reducers: {

  loginSuccess: (
    state,
    action,
  ) => {

    state.user =
      action.payload.user;

    state.token =
      action.payload.token;

    localStorage.setItem(
      'token',
      action.payload.token,
    );

    localStorage.setItem(
      'user',
      JSON.stringify(
        action.payload.user,
      ),
    );
  },

  updateUser: (
    state,
    action,
  ) => {

    state.user = {
      ...state.user,
      ...action.payload,
    };

    localStorage.setItem(
      'user',
      JSON.stringify(
        state.user,
      ),
    );
  },

  logoutSuccess:
    state => {

      state.user = null;
      state.token = null;

      localStorage.clear();
    },
},
  });

export const {
  loginSuccess,
  updateUser,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;