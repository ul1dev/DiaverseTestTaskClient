import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PaymentStateType } from '../types';

const paymentAdapter = createEntityAdapter();

const initialState: PaymentStateType = {
    isLoading: true,
    isLoaded: false,
    tonCourse: 0,
};

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setTonCourse: (state, action: PayloadAction<number>) => {
            state.tonCourse = action.payload;
            state.isLoading = false;
            state.isLoaded = true;
        },
        setIsTonCourseLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setTonCourse, setIsTonCourseLoading } = paymentSlice.actions;

export const { selectAll } = paymentAdapter.getSelectors(
    (state: any) => state.payment
);

export default paymentSlice.reducer;
