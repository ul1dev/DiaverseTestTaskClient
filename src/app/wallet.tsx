import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ConnectWalletBtn from '../components/ConnectWalletBtn';
import TransactionCard from '../components/TransactionCard';
import { useEffect, useState } from 'react';
import { getCompletedTransactions } from '../api/getCompletedTransactions';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function WalletScreen() {
    const [transactions, setTransactions] = useState([]);
    const { data: userData } = useTypedSelector((state) => state.user);

    useEffect(() => {
        updateTransactionsList();

        return () => setTransactions([]);
    }, []);

    async function updateTransactionsList() {
        const transactionsList = await getCompletedTransactions(userData.id);

        if (transactionsList.length) {
            setTransactions(transactionsList);
        }
    }

    return (
        <View style={styles.container}>
            <ConnectWalletBtn />

            {transactions.length && (
                <View>
                    <Text style={[styles.text, { marginBottom: 10 }]}>
                        Ваши покупки
                    </Text>
                    <ScrollView
                        contentContainerStyle={{
                            flex: 1,
                            backgroundColor: '#000',
                        }}
                    >
                        {transactions.map((transaction: any) => (
                            <TransactionCard
                                {...transaction}
                                key={transaction.id}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
});
