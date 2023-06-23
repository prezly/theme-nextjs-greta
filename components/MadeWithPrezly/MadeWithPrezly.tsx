import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { LogoPrezly } from 'icons';

import styles from './MadeWithPrezly.module.scss';

const FOOTER_HEIGHT = 88;

export function MadeWithPrezly() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        function handleScroll() {
            setIsVisible(
                window.innerHeight + Math.round(window.scrollY) <
                    document.body.offsetHeight - FOOTER_HEIGHT,
            );
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <a
            href="https://prez.ly/storytelling-platform"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(styles.wrapper, { [styles.visible]: isVisible })}
        >
            <span className={styles.text}>Made with</span>

            <LogoPrezly className={styles.logo} />
        </a>
    );
}
