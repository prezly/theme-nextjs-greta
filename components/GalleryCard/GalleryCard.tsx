import type { NewsroomGallery } from '@prezly/sdk';
import { getGalleryThumbnail } from '@prezly/theme-kit-core';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import UploadcareImage from '@uploadcare/nextjs-loader';
import classNames from 'classnames';
import Link from 'next/link';

import { getUploadcareImage } from '@/utils';

import styles from './GalleryCard.module.scss';

interface Props {
    className?: string;
    gallery: NewsroomGallery;
}

function GalleryCard({ className, gallery }: Props) {
    const { name, uuid } = gallery;
    const galleryThumbnail = getGalleryThumbnail(gallery);
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const thumbnailImage = getUploadcareImage(galleryThumbnail);

    return (
        <Link
            href={`/media/album/${uuid}`}
            locale={getLinkLocaleSlug()}
            className={classNames(styles.container, className)}
        >
            {thumbnailImage && (
                <div className={styles.thumbnailWrapper}>
                    <UploadcareImage
                        alt={name}
                        className={styles.thumbnail}
                        fill
                        sizes="(max-width: 1023px) 90vw, 580px"
                        src={thumbnailImage.cdnUrl}
                    />
                </div>
            )}
            <span className={styles.title}>{name}</span>
        </Link>
    );
}

export default GalleryCard;
