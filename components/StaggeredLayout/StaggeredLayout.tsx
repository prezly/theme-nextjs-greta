import type { CSSProperties, PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';

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

    return (
        <div style={props.style} className={classNameOutput}>
            {renderColumns()}
        </div>
    );
}

export default StaggeredLayout;
