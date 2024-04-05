import { ACTIONS, useAnalytics } from '@prezly/analytics-nextjs';
import { translations } from '@prezly/theme-kit-intl';
import { useDebouncedCallback } from '@react-hookz/web';
import type { ChangeEvent } from 'react';
import type { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useIntl } from 'react-intl';

import { IconSearch } from '@/icons';
import { Button, FormInput } from '@/ui';

import styles from './SearchInput.module.scss';

function SearchInput({ currentRefinement, refine }: SearchBoxProvided & SearchBoxExposed) {
    const { track } = useAnalytics();
    const { formatMessage } = useIntl();

    const trackQuery = useDebouncedCallback(
        (query: string) => {
            track(ACTIONS.SEARCH, { query });
        },
        [track],
        500,
    );

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const query = event.currentTarget.value;

        refine(query);
        trackQuery(query);
    }

    return (
        <form className={styles.container} method="GET" action="/search">
            <FormInput
                label={formatMessage(translations.search.inputLabel)}
                type="search"
                name="query"
                value={currentRefinement}
                onChange={handleChange}
                className={styles.input}
                placeholder={formatMessage(translations.search.inputHint, { inputHintExtra: '' })}
                autoComplete="off"
            />
            <Button
                type="submit"
                variation="secondary"
                className={styles.button}
                title={formatMessage(translations.search.action)}
                icon={IconSearch}
            />
        </form>
    );
}

export default connectSearchBox(SearchInput);
