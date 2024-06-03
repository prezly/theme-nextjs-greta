import { useSearchParams } from 'next/navigation';

export function useMaskParam(): boolean {
    const searchParams = useSearchParams();
    const mask = searchParams.get('mask');

    if (!mask) {
        return false;
    }

    try {
        return Boolean(JSON.parse(mask));
    } catch {
        return false;
    }
}
