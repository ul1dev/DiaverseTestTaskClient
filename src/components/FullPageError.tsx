import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import useIsMobile from '../hooks/use-is-mobile';

export default function FullPageError() {
    const isMobile = useIsMobile();

    const imgSize = isMobile ? 150 : 100;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={{
                        uri: 'https://em-content.zobj.net/source/telegram/386/crying-face_1f622.webp',
                    }}
                    style={{ width: imgSize, height: imgSize }}
                    resizeMode="contain"
                />
                <Text
                    style={[styles.errorText, { fontSize: isMobile ? 30 : 24 }]}
                >
                    Ошибка
                </Text>
            </View>
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
    content: {
        alignItems: 'center',
    },
    errorText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 12,
    },
});
