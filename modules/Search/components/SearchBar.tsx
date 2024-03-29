import { translations } from '@prezly/theme-kit-intl';
import classNames from 'classnames';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useDevice } from '@/hooks/useDevice';
import { IconMenu } from '@/icons';
import { Button } from '@/ui';

import { AVAILABLE_FACET_ATTRIBUTES } from '../utils';

import Facet from './Facet';
import SearchInput from './SearchInput';

import styles from './SearchBar.module.scss';

function Sidebar() {
    const [isShown, setIsShown] = useState(false);
    const { isMobile } = useDevice();

    function toggleFacets() {
        return setIsShown((s) => !s);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <SearchInput />
                </div>
                {isMobile && (
                    <Button
                        variation="navigation"
                        icon={IconMenu}
                        onClick={toggleFacets}
                        className={styles.toggleFacets}
                    >
                        <FormattedMessage {...translations.search.filters} />
                    </Button>
                )}
                <div className={classNames(styles.facets, { [styles.facetsOpen]: isShown })}>
                    <p className={styles.filters}>
                        <FormattedMessage {...translations.search.filters} />
                    </p>
                    {AVAILABLE_FACET_ATTRIBUTES.map((attribute) => (
                        <Facet
                            key={attribute}
                            attribute={attribute}
                            // This is a hack to make Algolia return more than 10 facets by default. We need to upgrade to v7 to allow finer control over this.
                            showMore
                            showMoreLimit={50}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
