import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TelegramStateType } from '../types';

const telegramAdapter = createEntityAdapter();

const initialState: TelegramStateType = {
    isTmaMounted: false,
};

export const telegramSlice = createSlice({
    name: 'telegram',
    initialState,
    reducers: {
        setIsTmaMounted: (state, action: PayloadAction<boolean>) => {
            state.isTmaMounted = action.payload;
        },
    },
});

export const { setIsTmaMounted } = telegramSlice.actions;

export const { selectAll } = telegramAdapter.getSelectors(
    (state: any) => state.telegram
);

export default telegramSlice.reducer;
