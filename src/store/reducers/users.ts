import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserStateType, UserType } from '../types';

const userAdapter = createEntityAdapter();

const initialState: UserStateType = {
    data: {
        id: '',
        telegramId: '',
        firstName: 'Loading...',
        lastName: null,
        userName: 'Loading...',
    },
    transactions: [],
    loading: true,
    isLoaded: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserType>) => {
            state.data = action.payload;
            state.isLoaded = true;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setTransactions: (state, action: PayloadAction<any[]>) => {
            state.transactions = action.payload;
        },
        addTransaction: (state, action: PayloadAction<any>) => {
            state.transactions = [action.payload, ...state.transactions];
        },
    },
});

export const { setUserData, setLoading, setTransactions, addTransaction } =
    userSlice.actions;

export const { selectAll } = userAdapter.getSelectors(
    (state: any) => state.user
);

export default userSlice.reducer;
