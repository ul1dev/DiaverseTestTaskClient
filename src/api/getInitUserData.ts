import { UserType } from '../store/types';
import api from './client';

export const getInitUserDataRequest = async (userData: {
    telegramId: string;
    firstName?: string;
    lastName?: string | null;
    userName?: string | null;
}) => {
    try {
        const data: { user: UserType } = await api
            .post(`${process.env.EXPO_PUBLIC_API_URL}/users/init`, {
                json: userData,
            })
            .json();

        return data;
    } catch (e) {}
};
