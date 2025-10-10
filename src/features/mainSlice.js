import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    navHeight: 0,
    userAuthorized: false,
};

const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        setNavHeight: (state, action) => {
            state.navHeight = action.payload;
        },
        seUserAuthorized: (state, action) => {
            state.userAuthorized = action.payload;
        },
    }
});
export const { setNavHeight,seUserAuthorized } = mainSlice.actions;
export default mainSlice.reducer;