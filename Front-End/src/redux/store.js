import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../redux/userReducer';
import theatreSlice from '../redux/theatreReducer';
import adminSlice from '../redux/adminReducer';
const store = configureStore({
    reducer: {
        user: userSlice,
        theatre: theatreSlice,
        admin: adminSlice

    },
});

export default store;
