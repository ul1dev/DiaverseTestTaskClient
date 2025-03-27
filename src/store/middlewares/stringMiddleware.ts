import type { Middleware } from '@reduxjs/toolkit';

const stringMiddleware: Middleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
};

export default stringMiddleware;
