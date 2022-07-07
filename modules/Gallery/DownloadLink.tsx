import translations from '@prezly/themes-intl-messages';
import { FormattedMessage } from 'react-intl';

import { IconDownload } from 'icons';

import styles from './DownloadLink.module.scss';

interface Props {
    href: string;
}

function DownloadLink({ href }: Props) {
    return (
        <a href={href} className={styles.link}>
            <FormattedMessage {...translations.actions.download} />
            <IconDownload width={24} height={24} className={styles.icon} />
        </a>
    );
}

export default DownloadLink;
