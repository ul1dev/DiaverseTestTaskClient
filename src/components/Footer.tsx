import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {
    return (
        <View style={styles.container}>
            <Link href="/" asChild>
                <TouchableOpacity>
                    <Ionicons name="home" size={32} color="#fff" />
                </TouchableOpacity>
            </Link>

            <Link href="/wallet" asChild>
                <TouchableOpacity>
                    <Ionicons name="wallet" size={32} color="#fff" />
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#000',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
    },
});
