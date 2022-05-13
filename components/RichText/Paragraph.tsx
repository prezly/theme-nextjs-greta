import { ParagraphNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ReactNode } from 'react';

import styles from './styles.module.scss';

interface Props {
    node: ParagraphNode;
    children?: ReactNode;
}

export function Paragraph({ node, children }: Props) {
    return (
        <p
            className={classNames(styles.paragraph, {
                [styles.alignLeft]: node.align === ParagraphNode.Alignment.LEFT,
                [styles.alignCenter]: node.align === ParagraphNode.Alignment.CENTER,
                [styles.alignRight]: node.align === ParagraphNode.Alignment.RIGHT,
            })}
        >
            {children}
        </p>
    );
}
