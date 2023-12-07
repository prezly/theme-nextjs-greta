import { translations } from '@prezly/theme-kit-intl';
import { useCompanyInformation, useNewsroom } from '@prezly/theme-kit-nextjs';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { HighlightedStoryCard, StaggeredLayout, StoryCard } from '@/components';
import type { StoryWithImage } from 'types';

import Illustration from '@/public/images/no-stories-illustration.svg';

import styles from './StoriesList.module.scss';

type Props = {
    stories: StoryWithImage[];
    isCategoryList?: boolean;
};

function StoriesList({ stories, isCategoryList = false }: Props) {
    const { name } = useCompanyInformation();
    const { display_name } = useNewsroom();

    const [highlightedStories, restStories] = useMemo(() => {
        if (isCategoryList) {
            return [[], stories];
        }
        // When there are only two stories, they should be both displayed as highlighted
        if (stories.length === 2) {
            return [stories, []];
        }

        return [stories.slice(0, 1), stories.slice(1)];
    }, [isCategoryList, stories]);

    if (!highlightedStories.length && !restStories.length) {
        return (
            <div className={styles.noStories}>
                <Illustration />
                <h1 className={styles.noStoriesTitle}>
                    <FormattedMessage
                        {...translations.noStories.title}
                        values={{ newsroom: name || display_name }}
                    />
                </h1>
                <p className={styles.noStoriesSubtitle}>
                    <FormattedMessage {...translations.noStories.subtitle} />
                </p>
            </div>
        );
    }

    return (
        <>
            {highlightedStories.length > 0 && (
                <div className={styles.highlightedStoriesContainer}>
                    {highlightedStories.map((story) => (
                        <HighlightedStoryCard key={story.uuid} story={story} />
                    ))}
                </div>
            )}
            {restStories.length > 0 && (
                <StaggeredLayout>
                    {restStories.map((story) => (
                        <StoryCard key={story.uuid} story={story} />
                    ))}
                </StaggeredLayout>
            )}
        </>
    );
}

export default StoriesList;
