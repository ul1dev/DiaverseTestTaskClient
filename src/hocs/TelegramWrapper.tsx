'use client';

import React, { useEffect } from 'react';
import {
    init,
    viewport,
    themeParams,
    isFullscreen,
    requestFullscreen,
    initDataUser,
    miniApp,
    initData,
} from '@telegram-apps/sdk-react';
import { isTMA } from '@telegram-apps/bridge';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import { setIsTmaMounted } from '../store/reducers/telegram';

export default function TelegramWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();

    useEffect(() => {
        mountTMA();
    }, []);

    async function mountTMA() {
        try {
            if (isTMA()) {
                init();

                if (viewport.mount.isAvailable() && !viewport.isMounted()) {
                    await viewport.mount();
                    if (viewport.expand.isAvailable()) {
                        viewport.expand();
                    }
                }

                if (
                    themeParams.mount.isAvailable() &&
                    !themeParams.isMounted()
                ) {
                    await themeParams.mount();
                }

                try {
                    if (!miniApp.isMounted()) {
                        await miniApp.mount();
                        miniApp.setBottomBarColor('#000000');
                        miniApp.setBackgroundColor('#000000');
                        miniApp.setHeaderColor('#000000');
                    }
                } catch (e) {}

                try {
                    let isMobile = true;

                    if (Platform.OS === 'web') {
                        const ua = navigator.userAgent.toLowerCase();
                        isMobile = /android|iphone|ipad|mobile/i.test(ua);
                    }

                    if (
                        requestFullscreen.isAvailable() &&
                        !isFullscreen() &&
                        isMobile
                    ) {
                        await requestFullscreen();
                    }
                } catch (e) {}

                try {
                    initData.restore();

                    const locale = localStorage.getItem('locale');
                    if (!locale) {
                        const userData = initDataUser();
                        const userLang = userData?.language_code ?? '';

                        const cisLanguages = [
                            'ru',
                            'be',
                            'uk',
                            'kk',
                            'hy',
                            'az',
                            'et',
                        ];

                        if (cisLanguages.includes(userLang)) {
                            localStorage.setItem('locale', 'ru');
                        } else {
                            localStorage.setItem('locale', 'en');
                        }
                    }
                } catch (e) {}

                dispatch(setIsTmaMounted(true));
            }
        } catch (e) {}
    }

    return children;
}
