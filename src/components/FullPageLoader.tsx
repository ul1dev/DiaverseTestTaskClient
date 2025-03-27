import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function FullPageLoader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={60} color="#fff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});
