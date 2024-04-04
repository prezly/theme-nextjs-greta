import { ACTIONS, useAnalytics } from '@prezly/analytics-nextjs';
import { translations } from '@prezly/theme-kit-intl';
import { useGetLinkLocaleSlug } from '@prezly/theme-kit-nextjs';
import type { ChangeEvent } from 'react';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, FormInput } from '@/ui';

import styles from './SearchBar.module.scss';

interface Props extends SearchBoxProvided, SearchBoxExposed {}

const SEARCH_PAGE_URL = 'search';

function SearchBar({ currentRefinement, refine }: Props) {
    const { track } = useAnalytics();
    const { formatMessage } = useIntl();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const localeSlug = getLinkLocaleSlug();

    const action = localeSlug ? `/${localeSlug}/${SEARCH_PAGE_URL}` : `/${SEARCH_PAGE_URL}`;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const query = event.currentTarget.value;

        refine(query);
        track(ACTIONS.SEARCH, { query });
    }

    return (
        <form className={styles.container} method="GET" action={action}>
            <div className={styles.inputWrapper}>
                <FormInput
                    label={formatMessage(translations.search.inputLabel)}
                    type="search"
                    name="query"
                    value={currentRefinement}
                    onChange={handleChange}
                    className={styles.input}
                    autoComplete="off"
                />
                {!currentRefinement.length && (
                    <span className={styles.inputHint}>
                        <FormattedMessage {...translations.search.inputHint} />
                    </span>
                )}
            </div>
            <Button type="submit" variation="secondary" className={styles.button}>
                <FormattedMessage {...translations.search.action} />
            </Button>
        </form>
    );
}

export default connectSearchBox(SearchBar);
