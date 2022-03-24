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

    return (
        <div style={props.style} className={classNameOutput}>
            {renderColumns()}
        </div>
    );
}

export default StaggeredLayout;
