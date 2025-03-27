import api from './client';

export const connectWallet = async (walletData: {
    address: string;
    publicKey: string;
    userId: string;
}) => {
    try {
        const data = await api
            .post(`${process.env.EXPO_PUBLIC_API_URL}/wallet/connect`, {
                json: walletData,
            })
            .json();

        return data;
    } catch (e) {}
};
