/* eslint-disable @typescript-eslint/no-use-before-define */

export type CardSize = 'small' | 'medium' | 'big' | 'tiny';

export function getCardImageSizes(cardSize: CardSize) {
    if (cardSize === 'tiny') {
        return '60px';
    }

    return [
        '(max-width: 430px) 390px',
        `(max-width: 767px) ${getTabletImageSize(cardSize)}`,
        getDesktopImageSize(cardSize),
    ].join(', ');
}

export function getTabletImageSize(cardSize: CardSize) {
    if (cardSize === 'big') {
        return '725px';
    }

    return '350px';
}

export function getDesktopImageSize(cardSize: CardSize) {
    switch (cardSize) {
        case 'medium':
            return '380px';
        case 'small':
            return '240px';
        default:
            return '600px';
    }
}
