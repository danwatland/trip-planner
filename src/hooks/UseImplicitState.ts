import * as React from 'react';

function useImplicitState<S extends Record<string | symbol, any>>(initialState: S) {
    const update = React.useReducer(() => ({}), 0)[1];

    const handler: ProxyHandler<S> = {
        get(target: S, key: keyof S): S[keyof S] {
            if (typeof target[key] === 'object' && target[key] !== null) {
                return new Proxy(target[key], handler);
            }

            return target[key];
        },
        set(target: S, key: keyof S, value: S[keyof S]): boolean {
            if (value === target[key]) {
                return true;
            }

            target[key] = value;
            update();

            return true;
        }
    };

    return React.useMemo(() => new Proxy(initialState, handler), []);
}

export {
    useImplicitState
}
