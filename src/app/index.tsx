import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { products } from '../configs/products';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Шкатулки</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {products.map((product) => (
                    <ProductCard {...product} key={product.id} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#222',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollContainer: {
        paddingVertical: 10,
        alignItems: 'center',
    },
});
