import { Children, useMemo, useRef } from 'react';
import type { PropsWithChildren } from 'react';

import { useDevice } from '@/hooks/useDevice';

type PropsType = {
    className: string;
    columnClassname: string;
};

function StaggeredLayout({ className, columnClassname, children }: PropsWithChildren<PropsType>) {
    const isLayoutInitializedRef = useRef(false);
    const { isMobile, isTablet } = useDevice();

    const columnCount = useMemo(() => {
        if (isMobile) {
            return 0;
        }

        // Only use the calculated layout if we're not on mobile screen
        isLayoutInitializedRef.current = true;

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

    if (!isLayoutInitializedRef.current) {
        return <div>{children}</div>;
    }

    return (
        <div className={className}>
            {childrenInColumns.map((columnItems, i) => (
                <div className={columnClassname} key={`column-${i}`}>
                    {columnItems}
                </div>
            ))}
        </div>
    );
}

export default StaggeredLayout;
