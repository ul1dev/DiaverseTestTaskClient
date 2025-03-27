import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        if (Platform.OS === 'web') {
            const ua = navigator.userAgent.toLowerCase();
            setIsMobile(/android|iphone|ipad|mobile/i.test(ua));
        } else {
            setIsMobile(true);
        }
    }, []);

    return isMobile;
};

export default useIsMobile;
