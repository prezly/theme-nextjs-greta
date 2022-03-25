import { useMedia } from 'react-use';

const BREAKPOINT_TABLET = 414;
const BREAKPOINT_DESKTOP = 768;

export function useDevice() {
    const isMobile = useMedia(`(max-width: ${BREAKPOINT_TABLET}px)`, true);
    const isTablet = useMedia(`(max-width: ${BREAKPOINT_DESKTOP}px)`, false);
    const isDesktop = useMedia(`(min-width: ${BREAKPOINT_DESKTOP + 1}px)`, false);

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
}
