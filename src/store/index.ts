import { configureStore } from '@reduxjs/toolkit';
import stringMiddleware from './middlewares/stringMiddleware';
import user from './reducers/users';
import telegram from './reducers/telegram';
import payment from './reducers/payment';

const store = configureStore({
    reducer: { user, telegram, payment },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
