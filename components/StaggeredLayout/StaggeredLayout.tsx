import type { CSSProperties, PropsWithChildren } from 'react';
import { Children, useCallback, useEffect, useState } from 'react';

type PropsType = {
    breakpointsColumn:
        | {
              default: number;
              [key: number]: number;
          }
        | number;
    className: string;
    columnClassname: string;
    columnAttributes?: { style?: object | CSSProperties };
    column?: number | any;
    style?: CSSProperties;
};

const DEFAULT_COLUMNS = 2;

function StaggeredLayout(props: PropsWithChildren<PropsType>) {
    const [columnCount, setColumnCount] = useState(0);

    const setColumnDefault = useCallback(
        () =>
            typeof props.breakpointsColumn === 'object'
                ? setColumnCount(props.breakpointsColumn.default)
                : setColumnCount(props.breakpointsColumn || DEFAULT_COLUMNS),
        [props.breakpointsColumn],
    );

    useEffect(() => {
        setColumnDefault();
    }, [setColumnDefault]);

    function itemsInColumns() {
        const currentColumnCount = columnCount;
        const itemsCols = new Array(currentColumnCount);

        // force children to be handled as an array
        const items = Children.toArray(props.children);

        items.forEach((_, i) => {
            const columnIndex = i % currentColumnCount;

            if (!itemsCols[columnIndex]) {
                itemsCols[columnIndex] = [];
            }

            itemsCols[columnIndex].push(items[i]);
        });

        return itemsCols;
    }

    function renderColumns() {
        const childrenInColumns = itemsInColumns();
        const columnWidth = `${100 / childrenInColumns.length}%`;
        let className = props.columnClassname;

        if (className && typeof className !== 'string') {
            // this is just checking whether a component passing a custom className or not. seems deprecated but in the meantime i'll pass it.
            if (typeof className === 'undefined') {
                className = 'my-masonry-grid_column';
            }
        }

        const columnAttributes = {
            ...props.columnAttributes,
            style: {
                ...props.columnAttributes?.style,
                width: columnWidth,
            },
            className,
        };

        return childrenInColumns.map((item, i) => {
            const columnKey = `column-${i}`;
            return (
                <div
                    className={columnAttributes.className}
                    style={columnAttributes.style}
                    key={columnKey}
                >
                    {item}
                </div>
            );
        });
    }

    return (
        <div style={props.style} className={props.className}>
            {renderColumns()}
        </div>
    );
}

export default StaggeredLayout;
