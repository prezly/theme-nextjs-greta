import { TrackingPolicy } from '@prezly/sdk';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

import { useAnalyticsContext } from '../context';
import { stringify } from '../lib';
import { DeferredIdentity } from '../types';

const DEFERRED_IDENTITY_STORAGE_KEY = 'prezly_ajs_deferred_identity';

export function useAnalytics() {
    const { consent, trackingPolicy } = useAnalyticsContext();
    const [deferredIdentity, setDeferredIdentity, removeDeferredIdentity] =
        useLocalStorage<DeferredIdentity>(DEFERRED_IDENTITY_STORAGE_KEY);

    const buildOptions = useCallback(() => {
        if (consent) {
            // No extra options
            return {};
        }

        /**
         * Mask IP address
         * @see https://segment.com/docs/sources/website/analytics.js/#anonymizing-ip
         */
        return {
            context: {
                ip: '0.0.0.0',
            },
        };
    }, [consent]);

    const ready = (callback: () => void) => {
        if (window.analytics && window.analytics.ready) {
            window.analytics.ready(callback);
        }
    };

    const identify = useCallback(
        (userId: string, traits = {}, callback?: () => void) => {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line prefer-rest-params, no-console
                console.log(`analytics.identify(${stringify(...arguments)})`);
            }

            if (trackingPolicy === TrackingPolicy.CONSENT_TO_IDENTIFY && !consent) {
                setDeferredIdentity({ userId, traits });
                if (callback) {
                    callback();
                }

                return;
            }

            if (window.analytics && window.analytics.identify) {
                window.analytics.identify(userId, traits, buildOptions(), callback);
            }
        },
        [buildOptions, consent, setDeferredIdentity, trackingPolicy],
    );

    const alias = (userId: string, previousId: string) => {
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line prefer-rest-params, no-console
            console.log(`analytics.alias(${stringify(...arguments)})`);
        }

        if (window.analytics && window.analytics.alias) {
            window.analytics.alias(userId, previousId, buildOptions());
        }
    };

    const page = (category?: string, name?: string, properties?: object, callback?: () => void) => {
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line prefer-rest-params, no-console
            console.log(`analytics.page(${stringify(...arguments)})`);
        }

        if (window.analytics && window.analytics.page) {
            window.analytics.page(category, name, properties, buildOptions(), callback);
        }
    };

    const track = (event: string, properties = {}, callback?: () => void) => {
        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line prefer-rest-params, no-console
            console.log(`analytics.track(${stringify(...arguments)})`);
        }

        if (window.analytics && window.analytics.track) {
            window.analytics.track(event, properties, buildOptions(), callback);
        }
    };

    const user = () => {
        if (window.analytics && window.analytics.user) {
            return window.analytics.user();
        }

        // Return fake user API to keep code working even without analytics.js loaded
        return {
            id() {
                return null;
            },
        };
    };

    useEffect(() => {
        if (consent) {
            if (deferredIdentity) {
                const { userId, traits } = deferredIdentity;
                identify(userId, traits);
                removeDeferredIdentity();
            }
        } else {
            const id = user().id();
            if (id) {
                setDeferredIdentity({ userId: id });
            }

            user().id(null); // erase user ID
        }
    }, [consent, deferredIdentity, identify, removeDeferredIdentity, setDeferredIdentity]);

    return {
        alias,
        identify,
        page,
        ready,
        track,
        user,
    };
}
