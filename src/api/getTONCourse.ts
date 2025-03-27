import ky from 'ky';

export const getTONCourse = async () => {
    try {
        const data: any = await ky
            .get('https://api.coingecko.com/api/v3/coins/the-open-network')
            .json();

        return data?.market_data?.current_price?.usd;
    } catch (e) {}
};
