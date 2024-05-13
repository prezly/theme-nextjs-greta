import type { AlgoliaStory } from '@prezly/theme-kit-core';
import { useNewsroom } from '@prezly/theme-kit-nextjs';
import UploadcareImage from '@uploadcare/nextjs-loader';
import classNames from 'classnames';

import { type CardSize, getCardImageSizes, getUploadcareImage } from '@/utils';
import type { StoryWithImage } from 'types';

import { getStoryThumbnail } from './lib';

import styles from './StoryImage.module.scss';

type Props = {
    story: StoryWithImage | AlgoliaStory;
    size: CardSize;
    className?: string;
    placeholderClassName?: string;
};

function StoryImage({ story, size, className, placeholderClassName }: Props) {
    const { name, newsroom_logo: logo } = useNewsroom();
    const image = getStoryThumbnail(story);
    const imageFile = getUploadcareImage(image);

    if (imageFile) {
        return (
            <div className={classNames(styles.imageContainer, className)}>
                <UploadcareImage
                    alt={story.title}
                    className={styles.image}
                    sizes={getCardImageSizes(size)}
                    src={imageFile.cdnUrl}
                    fill
                />
            </div>
        );
    }

    const logoFile = getUploadcareImage(logo);

    return (
        <span className={classNames(styles.placeholder, placeholderClassName)}>
            {logoFile && (
                <UploadcareImage
                    alt="No image"
                    className={classNames(styles.imageContainer, styles.placeholderLogo, className)}
                    src={logoFile.cdnUrl}
                    width={320}
                    height={56}
                />
            )}
            {!logo && name}
        </span>
    );
}

export default StoryImage;
