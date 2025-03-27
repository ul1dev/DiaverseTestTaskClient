import ky from 'ky';
import CryptoJS from 'crypto-js';

const secretKey = process.env.EXPO_PUBLIC_CRYPTO_SECRET;

if (!secretKey) {
    throw new Error('Missing EXPO_PUBLIC_CRYPTO_SECRET in environment');
}

const api = ky.extend({
    hooks: {
        beforeRequest: [
            async (request) => {
                const timestamp = Date.now().toString();
                const nonce = CryptoJS.lib.WordArray.random(16).toString(
                    CryptoJS.enc.Hex
                );
                const iv = CryptoJS.lib.WordArray.random(16).toString(
                    CryptoJS.enc.Hex
                );

                let newBody: BodyInit | null = null;
                const headers = new Headers(request.headers);

                if (request.body && !['GET', 'HEAD'].includes(request.method)) {
                    const clone = request.clone();
                    const body = await clone.json();

                    const encrypted = CryptoJS.AES.encrypt(
                        JSON.stringify(body),
                        secretKey,
                        {
                            iv: CryptoJS.enc.Hex.parse(iv),
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7,
                        }
                    ).toString();

                    newBody = JSON.stringify({ data: encrypted });
                    headers.set('Content-Type', 'application/json');
                }

                headers.set('x-timestamp', timestamp);
                headers.set('x-nonce', nonce);
                headers.set('x-iv', iv);

                return new Request(request, {
                    headers,
                    body: newBody || request.body,
                    method: request.method,
                    redirect: request.redirect,
                });
            },
        ],
    },
});

export default api;
