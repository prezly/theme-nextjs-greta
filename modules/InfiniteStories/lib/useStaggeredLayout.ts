/* eslint-disable consistent-return */
import Bricks from 'bricks.js';
import type { CSSProperties } from 'react';
import { useCallback, useRef } from 'react';
import { usePrevious } from 'react-use';
import { useDidMount, useDidUpdate } from 'rooks';

type MasonryState = {
    sizes: Bricks.SizeDetail[];
    packed: string;
    hasMoreBricks: boolean;
    style: CSSProperties;
    position?: boolean;
};

export function useStaggeredLayoutBricks(
    containerNode: Node | string,
    options: Partial<MasonryState>,
    bricks: number,
) {
    const bricksInstance = useRef<Bricks.Instance | null>(null);
    const bricksLength = usePrevious(bricks);

    const initializeBricks = useCallback(() => {
        const instance = Bricks({
            position: options.position ?? false,
            container: `.${containerNode}`,
            packed: options.packed ?? 'packed',
            sizes: options.sizes ?? [
                { columns: 1, gutter: 10 },
                { mq: '768px', columns: 2, gutter: 20 },
                { mq: '1024px', columns: 3, gutter: 40 },
            ],
        });
        return instance;
    }, [containerNode, options.packed, options.position, options.sizes]);

    // just a helper function if we need to update the layout manually.
    function updateBricksLayout() {
        bricksInstance.current?.update();
    }

    // initialization of bricks.js, packed up grid items inside the container.
    useDidMount(() => {
        bricksInstance.current = initializeBricks();

        bricksInstance.current.resize(true);

        if (bricks > 0) {
            bricksInstance.current.pack();
        }
    });

    // will update the bricks layout as soon as the length of the items is increased.
    useDidUpdate(() => {
        if (bricksLength === 0 && bricks > 0) {
            return bricksInstance.current?.pack();
        }

        if (bricksLength !== bricks && options.hasMoreBricks) {
            bricksInstance.current?.update();
        }

        bricksInstance.current?.resize(true);

        return () => {
            bricksInstance.current?.resize(false);
        };
    }, [bricks]);

    return { initializeBricks, updateBricksLayout, instance: bricksInstance.current };
}
