import api from './client';

export const createTransaction = async (transactionData: {
    userId: string;
    currency: string;
    count: number;
    amount: number;
    productTitle: string;
    hashHex: string;
}) => {
    try {
        const data = await api
            .post(`${process.env.EXPO_PUBLIC_API_URL}/transactions`, {
                json: transactionData,
            })
            .json();

        return data;
    } catch (e) {}
};
