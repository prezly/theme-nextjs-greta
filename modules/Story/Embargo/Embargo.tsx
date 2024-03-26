import { Culture } from '@prezly/sdk';
import type { EmbargoStory } from '@prezly/theme-kit-core';
import { translations } from '@prezly/theme-kit-intl';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

import styles from './Embargo.module.scss';

type Props = {
    story: EmbargoStory;
};

function Embargo({ story }: Props) {
    const { timezone } = story.newsroom;
    const date = new Date(story.published_at);

    return (
        <div className={styles.embargo}>
            <FormattedMessage
                {...translations.misc.embargoMessage}
                values={{
                    date: (
                        <>
                            <FormattedDate
                                value={date}
                                year="numeric"
                                month="long"
                                day="numeric"
                                timeZone={timezone}
                            />{' '}
                            <FormattedTime
                                value={date}
                                hour="2-digit"
                                minute="2-digit"
                                timeZone={timezone}
                            />{' '}
                            UTC
                            {date
                                .toLocaleString(Culture.isoCode(story.culture.code), {
                                    timeZoneName: 'longOffset',
                                    timeZone: timezone,
                                })
                                .replace(/^.*? GMT/, '')}
                        </>
                    ),
                }}
            />
        </div>
    );
}

export default Embargo;
