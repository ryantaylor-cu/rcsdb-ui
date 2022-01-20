import { createSlice } from '@reduxjs/toolkit';

const initialState = { viewAs: null };

export default createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setViewAs: (state, action) => {
            state.viewAs = action.payload;
        },
        reset: state => {
            Object.assign(state, initialState);
        },
    },
});
