import { View, StyleSheet, Text } from 'react-native';

interface Props {
    userId: string;
    status: string;
    currency: string;
    count: number;
    amount: number;
    productTitle: string;
    hashHex: string;
}

export default function TransactionCard({
    productTitle,
    currency,
    amount,
}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{productTitle}</Text>
            <Text style={styles.text}>
                {amount} {currency}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginVertical: 5,
        flexDirection: 'row',
        maxHeight: 40,
        width: 300,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});
