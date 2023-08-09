import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../redux/userReducer';
const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export default store;
