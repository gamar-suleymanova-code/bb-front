import { configureStore } from "@reduxjs/toolkit";
import authFormReducer from '../features/authFormSlice';
import mainReducer from '../features/mainSlice';
export default configureStore({
    reducer: {
        authForm: authFormReducer,
        main: mainReducer
    },
});