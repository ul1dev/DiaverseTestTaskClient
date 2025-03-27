global.Buffer = require('buffer').Buffer;

import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import useIsMobile from '../hooks/use-is-mobile';
import { Provider } from 'react-redux';
import store from '../store';
import AuthWrapper from '../hocs/AuthWrapper';
import TelegramWrapper from '../hocs/TelegramWrapper';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function Layout() {
    const isMobile = useIsMobile();

    return (
        <Provider store={store}>
            <TelegramWrapper>
                <TonConnectUIProvider manifestUrl="https://dev-client.moonlycoin.com/tonconnect-manifest.json">
                    <AuthWrapper>
                        <View
                            style={[
                                styles.container,
                                {
                                    paddingBottom: isMobile ? 30 : 0,
                                    paddingTop: isMobile ? 100 : 0,
                                },
                            ]}
                        >
                            <View style={{ flex: 1 }}>
                                <Stack
                                    screenOptions={{
                                        headerShown: false,
                                        contentStyle: {
                                            backgroundColor: '#000',
                                        },
                                    }}
                                />
                            </View>

                            <Footer />
                        </View>
                    </AuthWrapper>
                </TonConnectUIProvider>
            </TelegramWrapper>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
