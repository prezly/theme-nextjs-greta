import classNames from 'classnames';
import { Children, useEffect, useMemo, useRef } from 'react';
import type { PropsWithChildren } from 'react';

import { useDevice } from '@/hooks/useDevice';

import styles from './StaggeredLayout.module.scss';

function StaggeredLayout({ children }: PropsWithChildren<{}>) {
    const isLayoutInitialized = useRef(false);
    const { isMobile, isTablet } = useDevice();

    useEffect(() => {
        isLayoutInitialized.current = false;
    }, [isMobile]);

    const columnCount = useMemo(() => {
        if (isMobile) {
            return 0;
        }

        // Only use the calculated layout if we're not on mobile screen
        isLayoutInitialized.current = true;

        if (isTablet) {
            return 2;
        }

        return 3;
    }, [isMobile, isTablet]);

    const childrenInColumns = useMemo(() => {
        const itemsCols = new Array(columnCount);

        // force children to be handled as an array
        const items = Children.toArray(children);

        items.forEach((item, i) => {
            const columnIndex = i % columnCount;

            if (!itemsCols[columnIndex]) {
                itemsCols[columnIndex] = [];
            }

            itemsCols[columnIndex].push(item);
        });

        return itemsCols;
    }, [children, columnCount]);

    if (!isLayoutInitialized.current) {
        return (
            <div
                className={classNames({
                    [styles.containerMobile]: isMobile,
                })}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            className={classNames(styles.container, {
                [styles.containerDesktop]: columnCount === 3,
            })}
        >
            {childrenInColumns.map((columnItems, i) => (
                <div key={`column-${i}`}>{columnItems}</div>
            ))}
        </div>
    );
}

export default StaggeredLayout;
