import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductType } from '../configs/products';
import ProductCardModal from './ProductCardModal';

interface Props extends ProductType {}

export default function ProductCard({
    id,
    color,
    textColor,
    name,
    price,
}: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={[styles.card, { backgroundColor: color }]}>
            <Text style={[styles.cardText, { color: textColor }]}>{name}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>{price} USD</Text>
            </TouchableOpacity>

            <ProductCardModal
                {...{
                    id,
                    color,
                    textColor,
                    name,
                    price,
                    modalVisible,
                    setModalVisible,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        maxWidth: 400,
        height: 200,
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 'auto',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#4e4e4e',
        borderRadius: 8,
        padding: 20,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#fff',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 30,
        color: '#fff',
    },
    payButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
