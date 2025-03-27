import api from './client';

export const getCompletedTransactions = async (userId: string) => {
    try {
        const data: any = await api
            .get(
                `${process.env.EXPO_PUBLIC_API_URL}/transactions/completed/by-user-id/${userId}`
            )
            .json();

        return data;
    } catch (e) {}
};
