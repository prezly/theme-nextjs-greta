import type { NewsroomGallery } from '@prezly/sdk';
import { translations } from '@prezly/theme-kit-intl';
import { type PaginationProps, useInfiniteGalleriesLoading } from '@prezly/theme-kit-nextjs';
import { useIntl } from 'react-intl';

import { PageTitle } from '@/components';
import { Button } from '@/ui';

import Layout from '../Layout';

import GalleriesList from './GalleriesList';

import styles from './Galleries.module.scss';

type Props = {
    initialGalleries: NewsroomGallery[];
    pagination: PaginationProps;
};

function Galleries({ initialGalleries, pagination }: Props) {
    const { formatMessage } = useIntl();

    const { canLoadMore, galleries, isLoading, loadMoreGalleries } = useInfiniteGalleriesLoading(
        initialGalleries,
        pagination,
    );

    return (
        <Layout title={formatMessage(translations.mediaGallery.title)}>
            <PageTitle title={formatMessage(translations.mediaGallery.title)} />
            <GalleriesList galleries={galleries} />

            {canLoadMore && (
                <Button
                    variation="secondary"
                    onClick={loadMoreGalleries}
                    isLoading={isLoading}
                    className={styles.loadMore}
                >
                    {formatMessage(
                        isLoading ? translations.misc.stateLoading : translations.actions.loadMore,
                    )}
                </Button>
            )}
        </Layout>
    );
}

export default Galleries;
