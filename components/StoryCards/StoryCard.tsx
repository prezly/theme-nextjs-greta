import { StoryPublicationDate } from '@prezly/themes-ui-components';
import classNames from 'classnames';
import Link from 'next/link';

import { useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';

import styles from './StoryCard.module.scss';

type Props = {
    story: StoryWithImage;
};

function StoryCard({ story }: Props) {
    const { categories, title, subtitle } = story;
    const { showDate, showSubtitle } = useThemeSettings();

    return (
        <div className={classNames(styles.container)}>
            <Link href={`/${story.slug}`} locale={false} passHref>
                <a className={styles.imageWrapper}>
                    <StoryImage
                        story={story}
                        className={styles.image}
                        placeholderClassName={styles.placeholder}
                    />
                </a>
            </Link>
            <div className={classNames(styles.content)}>
                {categories.length > 0 && (
                    <CategoriesList
                        categories={categories}
                        className={styles.categories}
                        showAllCategories
                        isStatic
                    />
                )}
                <h2
                    className={classNames(styles.title, {
                        [styles.noSpacingBottom]: !subtitle && !showDate,
                    })}
                >
                    <Link href={`/${story.slug}`} locale={false} passHref>
                        <a className={styles.titleLink}>{title}</a>
                    </Link>
                </h2>

                {subtitle && showSubtitle && (
                    <p className={styles.subtitle}>
                        <Link href={`/${story.slug}`} locale={false} passHref>
                            <a className={styles.subtitleLink}>{subtitle}</a>
                        </Link>
                    </p>
                )}

                {showDate && (
                    <p className={styles.date}>
                        <StoryPublicationDate story={story} />
                    </p>
                )}
            </div>
        </div>
    );
}

export default StoryCard;
