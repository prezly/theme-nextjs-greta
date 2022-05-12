import { QuoteNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import styles from './Quote.module.scss';

interface Props {
    node: QuoteNode;
}

export function Quote({ node, children }: PropsWithChildren<Props>) {
    const alignment = node.align ?? QuoteNode.Alignment.LEFT;

    return (
        <blockquote className={styles.container}>
            <div
                className={classNames(styles.content, {
                    [styles.alignLeft]: alignment === QuoteNode.Alignment.LEFT,
                    [styles.alignCenter]: alignment === QuoteNode.Alignment.CENTER,
                    [styles.alignRight]: alignment === QuoteNode.Alignment.RIGHT,
                })}
            >
                {children}
            </div>
        </blockquote>
    );
}
