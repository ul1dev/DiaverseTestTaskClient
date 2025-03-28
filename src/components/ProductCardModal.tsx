import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import { ProductType } from '../configs/products';
import {
    SendTransactionRequest,
    useTonConnectUI,
    useTonWallet,
} from '@tonconnect/ui-react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import BigNumber from 'bignumber.js';
import { getTONCourse } from '../api/getTONCourse';
import { useDispatch } from 'react-redux';
import { setIsTonCourseLoading, setTonCourse } from '../store/reducers/payment';
import TonWeb from 'tonweb';
import { getTransactionInfo } from '../api/getTransactionInfo';
import { createTransaction } from '../api/createTransaction';
import { addTransaction } from '../store/reducers/users';
import { v4 as uuid } from 'uuid';

interface Props extends ProductType {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
}

export default function ProductCardModal({
    name,
    price,
    modalVisible,
    setModalVisible,
}: Props) {
    const { isLoaded, isLoading, tonCourse } = useTypedSelector(
        (state) => state.payment
    );
    const { data: userData } = useTypedSelector((state) => state.user);
    const dispatch = useDispatch();
    const [tonConnectUI] = useTonConnectUI();
    const [isTransactionSending, setIsTransactionSending] = useState(false);
    const wallet = useTonWallet();

    const isDisabled = isLoading || !isLoaded || isTransactionSending;

    const tonAmount = new BigNumber(price).div(tonCourse);
    const nanoTonAmount = tonAmount
        .multipliedBy(1e9)
        .toFixed(0, BigNumber.ROUND_FLOOR);

    async function updateTONCourse() {
        dispatch(setIsTonCourseLoading(true));

        const course = await getTONCourse();

        if (course) {
            dispatch(setTonCourse(course));
        }
    }

    useEffect(() => {
        updateTONCourse();

        const interval = setInterval(updateTONCourse, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleBuy = async () => {
        if (isDisabled) return;

        if (!wallet?.account?.address) {
            return alert('Подключите кошелек');
        }

        setModalVisible(false);
        setIsTransactionSending(true);

        try {
            const transaction: SendTransactionRequest = {
                validUntil: Date.now() + 5 * 60 * 1000,
                messages: [
                    {
                        address: process.env.EXPO_PUBLIC_PAYMENT_ADDRESS!,
                        amount: nanoTonAmount,
                    },
                ],
            };

            const transactionRes = await tonConnectUI.sendTransaction(
                transaction
            );

            const bocCellBytes = await TonWeb.boc.Cell.oneFromBoc(
                TonWeb.utils.base64ToBytes(transactionRes.boc)
            ).hash();
            const hashHex = TonWeb.utils.bytesToHex(bocCellBytes);

            const transactionData = {
                userId: userData.id,
                currency: 'USD',
                count: 1,
                amount: price,
                productTitle: `${name} шкатулка`,
                hashHex,
            };

            await createTransaction(transactionData);

            const isSuccess = await isTransactionSuccess(hashHex);

            if (isSuccess) {
                alert(`Успешная покупка!`);

                dispatch(
                    addTransaction({
                        id: uuid(),
                        status: 'PROCESSED',
                        ...transactionData,
                    })
                );
            } else {
                alert('Транзакция не прошла');
            }
        } catch (error) {
            alert('Ошибка при отправке транзакции');
        } finally {
            setIsTransactionSending(false);
            setModalVisible(false);
        }
    };

    async function isTransactionSuccess(hashHex: string): Promise<boolean> {
        const transactionInfo = await getTransactionInfo(hashHex);

        if (!transactionInfo || transactionInfo.status === 'PROCESSING') {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return isTransactionSuccess(hashHex);
        } else {
            return transactionInfo.status === 'PROCESSED';
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>
                                Покупка шкатулки
                            </Text>
                            <Text style={styles.modalText}>
                                Тип: {name}
                                {'\n'}
                                Курс TON/USD:{' '}
                                {tonCourse ? tonCourse : 'Loading...'}
                                {'\n'}
                                Цена в USD: {price}
                                {'\n'}
                                Цена в TON:{' '}
                                {tonCourse
                                    ? tonAmount.toFixed(10)
                                    : 'Loading...'}
                            </Text>
                            <TouchableOpacity
                                style={styles.payButton}
                                onPress={handleBuy}
                                disabled={isDisabled}
                            >
                                {isDisabled ? (
                                    <ActivityIndicator size={20} color="#fff" />
                                ) : (
                                    <Text style={styles.payButtonText}>
                                        Оплатить
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
        maxWidth: 400,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
