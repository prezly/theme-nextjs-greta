import { useMediaQuery } from '@react-hookz/web';

const BREAKPOINT_MOBILE = 430;
const BREAKPOINT_TABLET = 767;
const BREAKPOINT_DESKTOP = 1024;

export function useDevice() {
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT_MOBILE}px)`, true) ?? true;
    const isTablet = useMediaQuery(
        `(min-width: ${BREAKPOINT_MOBILE + 1}px) and (max-width: ${BREAKPOINT_TABLET}px)`,
        false,
    );
    const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINT_DESKTOP}px)`, false);

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
}
