import React, { useEffect } from 'react';
import { View } from 'react-native';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { connectWallet } from '../api/connectWallet';
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function ConnectWalletBtn() {
    const { data: userData } = useTypedSelector((state) => state.user);
    const [tonConnectUI] = useTonConnectUI();

    useEffect(() => {
        tonConnectUI.onStatusChange(async (wallet) => {
            if (wallet && wallet.account) {
                await connectWallet({
                    address: wallet.account.address,
                    // @ts-ignore
                    publicKey: wallet.account.publicKey,
                    userId: userData.id,
                });
            }
        });
    }, [tonConnectUI]);

    return (
        <View style={{ padding: 16 }}>
            <TonConnectButton />
        </View>
    );
}
