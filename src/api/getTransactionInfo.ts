import api from './client';

export const getTransactionInfo = async (hashHex: string) => {
    try {
        const data: any = await api
            .get(
                `${process.env.EXPO_PUBLIC_API_URL}/transactions/by-hash/${hashHex}`
            )
            .json();

        return data;
    } catch (e) {}
};
