import { DOWNLOAD, useAnalytics } from '@prezly/analytics-nextjs';
import { translations } from '@prezly/theme-kit-intl';
import { FormattedMessage } from 'react-intl';

import { IconDownload } from '@/icons';
import { ButtonLink } from '@/ui';

import styles from './DownloadLink.module.scss';

interface Props {
    href: string;
}

function DownloadLink({ href }: Props) {
    const { track } = useAnalytics();

    function handleClick() {
        track(DOWNLOAD.MEDIA_GALLERY);
    }

    return (
        <ButtonLink
            variation="primary"
            forceRefresh
            href={href}
            className={styles.link}
            onClick={handleClick}
        >
            <FormattedMessage {...translations.actions.download} />
            <IconDownload width={16} height={16} className={styles.icon} />
        </ButtonLink>
    );
}

export default DownloadLink;
