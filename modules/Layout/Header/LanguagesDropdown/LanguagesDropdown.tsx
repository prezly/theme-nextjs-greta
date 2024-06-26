import { ACTIONS, useAnalytics } from '@prezly/analytics-nextjs';
import { getLanguageDisplayName, LocaleObject } from '@prezly/theme-kit-core';
import {
    useCurrentLocale,
    useCurrentStory,
    useGetLinkLocaleSlug,
    useGetTranslationUrl,
    useLanguages,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import { useMemo } from 'react';

import { Dropdown } from '@/components';
import { useDisplayedLanguages } from '@/hooks';
import { IconGlobe } from '@/icons';

import styles from './LanguagesDropdown.module.scss';

type Props = {
    buttonClassName?: string;
    navigationItemClassName?: string;
    hasError?: boolean;
};

function LanguagesDropdown({ buttonClassName, navigationItemClassName, hasError }: Props) {
    const { track } = useAnalytics();
    const currentLocale = useCurrentLocale();
    const languages = useLanguages();
    const getTranslationUrl = useGetTranslationUrl();
    const currentStory = useCurrentStory();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();

    const currentLanguage = useMemo(
        () => languages.find((language) => language.code === currentLocale.toUnderscoreCode()),
        [currentLocale, languages],
    );

    const displayedLanguages = useDisplayedLanguages();

    // Don't show language selector if there are no other locale to choose
    if (!currentLanguage || displayedLanguages.length <= 1) {
        return null;
    }

    return (
        <li className={navigationItemClassName}>
            <Dropdown
                icon={IconGlobe}
                label={getLanguageDisplayName(currentLanguage, languages)}
                className={styles.container}
                menuClassName={styles.menu}
                buttonClassName={classNames(buttonClassName, styles.button)}
                withMobileDisplay
            >
                {displayedLanguages.map((language) => {
                    const locale = LocaleObject.fromAnyCode(language.code);
                    const translationLink = hasError ? '/' : getTranslationUrl(locale);

                    return (
                        <Dropdown.Item
                            key={locale.toHyphenCode()}
                            href={translationLink}
                            localeCode={
                                currentStory && translationLink !== '/'
                                    ? false
                                    : getLinkLocaleSlug(locale)
                            }
                            forceRefresh
                            withMobileDisplay
                            onClick={() =>
                                track(ACTIONS.SWITCH_LANGUAGE, { code: locale.toHyphenCode() })
                            }
                            className={classNames({
                                [styles.disabled]:
                                    language.code === currentLocale.toUnderscoreCode(),
                            })}
                        >
                            {getLanguageDisplayName(language, languages)}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown>
        </li>
    );
}

export default LanguagesDropdown;
