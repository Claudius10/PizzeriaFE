import {useEffect, useLayoutEffect, useCallback, useRef, RefObject, Dispatch, SetStateAction, useState} from 'react';


{/*
*  https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
*  Custom hook that uses either useLayoutEffect or useEffect based on the environment (client-side or server-side).
* */
}

export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

{/*
*  https://usehooks-ts.com/react-hook/use-event-callback
*  Custom hook that creates a memoized event callback.
* */
}

export function useEventCallback<Args extends unknown[], R>(
    fn: (...args: Args) => R,
): (...args: Args) => R {
    const ref = useRef<typeof fn>(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    useIsomorphicLayoutEffect(() => {
        ref.current = fn;
    }, [fn]);

    return useCallback((...args: Args) => ref.current(...args), [ref]);
}


{/*
*  https://usehooks-ts.com/react-hook/use-event-listener
*  Custom hook that attaches event listeners to DOM elements, the window, or media query lists.
* */
}

// MediaQueryList Event based useEventListener interface
function useEventListener<K extends keyof MediaQueryListEventMap>(
    eventName: K,
    handler: (event: MediaQueryListEventMap[K]) => void,
    element: RefObject<MediaQueryList>,
    options?: boolean | AddEventListenerOptions,
): void

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: undefined,
    options?: boolean | AddEventListenerOptions,
): void

// Element Event based useEventListener interface
function useEventListener<
    K extends keyof HTMLElementEventMap,
    T extends HTMLElement = HTMLDivElement,
>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T>,
    options?: boolean | AddEventListenerOptions,
): void

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    element: RefObject<Document>,
    options?: boolean | AddEventListenerOptions,
): void

function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    KM extends keyof MediaQueryListEventMap,
    T extends HTMLElement | MediaQueryList = HTMLElement,
>(
    eventName: KW | KH | KM,
    handler: (
        event:
            | WindowEventMap[KW]
            | HTMLElementEventMap[KH]
            | MediaQueryListEventMap[KM]
            | Event,
    ) => void,
    element?: RefObject<T>,
    options?: boolean | AddEventListenerOptions,
) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        // Define the listening target
        const targetElement: T | Window = element?.current ?? window;

        if (!(targetElement && targetElement.addEventListener)) return;

        // Create event listener that calls handler function stored in ref
        const listener: typeof handler = event => {
            savedHandler.current(event);
        };

        targetElement.addEventListener(eventName, listener, options);

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}

export {useEventListener};

{/*
*  https://usehooks-ts.com/react-hook/use-session-storage
*  Custom hook that uses session storage to persist state across page reloads.
* */
}

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface WindowEventMap {
        'session-storage': CustomEvent;
    }
}

type UseSessionStorageOptions<T> = {
    serializer?: (value: T) => string
    deserializer?: (value: string) => T
    initializeWithValue?: boolean
}

const IS_SERVER = typeof window === 'undefined';

export function useSessionStorage<T>(
    key: string,
    initialValue: T | (() => T),
    options: UseSessionStorageOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>] {
    const {initializeWithValue = true} = options;

    const serializer = useCallback<(value: T) => string>(
        value => {
            if (options.serializer) {
                return options.serializer(value);
            }

            return JSON.stringify(value);
        },
        [options],
    );

    const deserializer = useCallback<(value: string) => T>(
        value => {
            if (options.deserializer) {
                return options.deserializer(value);
            }
            // Support 'undefined' as a value
            if (value === 'undefined') {
                return undefined as unknown as T;
            }

            const defaultValue =
                initialValue instanceof Function ? initialValue() : initialValue;

            let parsed: unknown;
            try {
                parsed = JSON.parse(value);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return defaultValue; // Return initialValue if parsing fails
            }

            return parsed as T;
        },
        [options, initialValue],
    );

    // Get from session storage then
    // parse stored json or return initialValue
    const readValue = useCallback((): T => {
        const initialValueToUse =
            initialValue instanceof Function ? initialValue() : initialValue;

        // Prevent build error "window is undefined" but keep working
        if (IS_SERVER) {
            return initialValueToUse;
        }

        try {
            const raw = window.sessionStorage.getItem(key);
            return raw ? deserializer(raw) : initialValueToUse;
        } catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error);
            return initialValueToUse;
        }
    }, [initialValue, key, deserializer]);

    const [storedValue, setStoredValue] = useState(() => {
        if (initializeWithValue) {
            return readValue();
        }

        return initialValue instanceof Function ? initialValue() : initialValue;
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to sessionStorage.
    const setValue: Dispatch<SetStateAction<T>> = useEventCallback(value => {
        // Prevent build error "window is undefined" but keeps working
        if (IS_SERVER) {
            console.warn(
                `Tried setting sessionStorage key “${key}” even though environment is not a client`,
            );
        }

        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(readValue()) : value;

            // Save to session storage
            window.sessionStorage.setItem(key, serializer(newValue));

            // Save state
            setStoredValue(newValue);

            // We dispatch a custom event so every similar useSessionStorage hook is notified
            window.dispatchEvent(new StorageEvent('session-storage', {key}));
        } catch (error) {
            console.warn(`Error setting sessionStorage key “${key}”:`, error);
        }
    });

    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const handleStorageChange = useCallback(
        (event: StorageEvent | CustomEvent) => {
            if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
                return;
            }
            setStoredValue(readValue());
        },
        [key, readValue],
    );

    // this only works for other documents, not the current one
    useEventListener('storage', handleStorageChange);

    // this is a custom event, triggered in writeValueToSessionStorage
    // See: useSessionStorage()
    useEventListener('session-storage', handleStorageChange);

    return [storedValue, setValue];
}