import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authRegFormHeight: 0,
  authLoginFormHeight: 0,
  registerFormActive: false
};

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    setAuthRegFormHeight: (state, action) => {
      state.authRegFormHeight = action.payload;
    },
    setAuthLoginFormHeight: (state, action) => {
      state.authLoginFormHeight = action.payload;
    },
    setRegisterFormActive: (state, action) => {
      state.registerFormActive = action.payload;
    }
  }
});

export const {
  setAuthRegFormHeight,
  setAuthLoginFormHeight,
  setRegisterFormActive
} = authFormSlice.actions;

export default authFormSlice.reducer;
