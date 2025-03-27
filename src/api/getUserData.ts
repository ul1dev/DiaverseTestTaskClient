import { UserType } from '../store/types';
import api from './client';

export const getUserDataByIdRequest = async (userId: string) => {
    try {
        const data: UserType = await api
            .get(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`)
            .json();

        return data;
    } catch (e) {}
};
