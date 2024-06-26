import { translations } from '@prezly/theme-kit-intl';
import {
    useAlgoliaSettings,
    useCategories,
    useCompanyInformation,
    useGetLinkLocaleSlug,
    useNewsroom,
} from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDevice, useDisplayedLanguages, useThemeSettings } from '@/hooks';
import { IconClose, IconMenu, IconSearch } from '@/icons';
import { Button, ButtonLink } from '@/ui';

import CategoriesDropdown from './CategoriesDropdown';
import LanguagesDropdown from './LanguagesDropdown';
import { Logo } from './Logo';

import styles from './Header.module.scss';

const SearchWidget = dynamic(() => import('./SearchWidget'), { ssr: false });

interface Props {
    hasError?: boolean;
}

function Header({ hasError }: Props) {
    const { newsroom_logo, display_name, public_galleries_number } = useNewsroom();
    const { logoSize } = useThemeSettings();
    const categories = useCategories();
    const displayedLanguages = useDisplayedLanguages();
    const { name } = useCompanyInformation();
    const getLinkLocaleSlug = useGetLinkLocaleSlug();
    const { formatMessage } = useIntl();
    const { ALGOLIA_API_KEY } = useAlgoliaSettings();
    const { isMobile } = useDevice();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchWidgetShown, setIsSearchWidgetShown] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const shouldShowMenu =
        categories.length > 0 || displayedLanguages.length > 0 || public_galleries_number > 0;

    const IS_SEARCH_ENABLED = Boolean(ALGOLIA_API_KEY);

    function alignMobileHeader() {
        if (!isMobile) {
            return;
        }

        const header = headerRef.current;
        const headerRect = header?.getBoundingClientRect();

        // If header is not on top of the screen (e.g. a cookie banner is shown or user has scrolled down a bit),
        // Align the header with the top of the screen
        if (headerRect && headerRect.top !== 0) {
            window.scrollBy({ top: headerRect.top });
        }
    }

    function toggleMenu() {
        alignMobileHeader();

        // Adding a timeout to update the state only after the scrolling is triggered.
        setTimeout(() => setIsMenuOpen((o) => !o));
    }
    function closeMenu() {
        return setIsMenuOpen(false);
    }

    function toggleSearchWidget(event: MouseEvent) {
        event.preventDefault();
        alignMobileHeader();

        // Adding a timeout to update the state only after the scrolling is triggered.
        setTimeout(() => setIsSearchWidgetShown((o) => !o));
    }
    function closeSearchWidget() {
        return setIsSearchWidgetShown(false);
    }

    // Add scroll lock to the body while mobile menu is open
    useEffect(() => {
        document.body.classList.toggle(styles.body, isMenuOpen);

        return () => {
            document.body.classList.remove(styles.body);
        };
    }, [isMenuOpen]);

    const newsroomName = name || display_name;

    return (
        <header ref={headerRef} className={styles.container}>
            <div className="container">
                <nav role="navigation" className={styles.header}>
                    <Link
                        href="/"
                        locale={getLinkLocaleSlug()}
                        className={classNames(styles.newsroom, {
                            [styles.withoutLogo]: !newsroom_logo,
                        })}
                    >
                        <h1
                            className={classNames(styles.title, {
                                [styles.hidden]: newsroom_logo,
                            })}
                        >
                            {newsroomName}
                        </h1>
                        <Logo image={newsroom_logo} size={logoSize} />
                    </Link>

                    <div className={styles.navigationWrapper}>
                        {IS_SEARCH_ENABLED && (
                            <ButtonLink
                                href="/search"
                                localeCode={getLinkLocaleSlug()}
                                variation="navigation"
                                className={classNames(styles.searchToggle, {
                                    [styles.hidden]: isMenuOpen,
                                    [styles.close]: isSearchWidgetShown,
                                })}
                                icon={isSearchWidgetShown && isMobile ? IconClose : IconSearch}
                                onClick={toggleSearchWidget}
                                aria-expanded={isSearchWidgetShown}
                                aria-controls="search-widget"
                                title={formatMessage(translations.search.title)}
                                aria-label={formatMessage(translations.search.title)}
                            />
                        )}

                        {shouldShowMenu && (
                            <Button
                                variation="navigation"
                                icon={isMenuOpen ? IconClose : IconMenu}
                                className={classNames(styles.navigationToggle, {
                                    [styles.hidden]: isSearchWidgetShown,
                                })}
                                onClick={toggleMenu}
                                aria-expanded={isMenuOpen}
                                aria-controls="menu"
                                title={formatMessage(translations.misc.toggleMobileNavigation)}
                                aria-label={formatMessage(translations.misc.toggleMobileNavigation)}
                            />
                        )}

                        <div
                            className={classNames(styles.navigation, { [styles.open]: isMenuOpen })}
                        >
                            <div role="none" className={styles.backdrop} onClick={closeMenu} />
                            <ul id="menu" className={styles.navigationInner}>
                                {public_galleries_number > 0 && (
                                    <li className={styles.navigationItem}>
                                        <ButtonLink
                                            href="/media"
                                            localeCode={getLinkLocaleSlug()}
                                            variation="navigation"
                                            className={styles.navigationButton}
                                        >
                                            <FormattedMessage
                                                {...translations.mediaGallery.title}
                                            />
                                        </ButtonLink>
                                    </li>
                                )}
                                <CategoriesDropdown
                                    categories={categories}
                                    buttonClassName={styles.navigationButton}
                                    navigationItemClassName={styles.navigationItem}
                                    navigationButtonClassName={styles.navigationButton}
                                />
                                <LanguagesDropdown
                                    buttonClassName={styles.navigationButton}
                                    navigationItemClassName={styles.navigationItem}
                                    hasError={hasError}
                                />
                            </ul>
                        </div>

                        {IS_SEARCH_ENABLED && (
                            <SearchWidget
                                dialogClassName={styles.mobileSearchWrapper}
                                isOpen={isSearchWidgetShown}
                                onClose={closeSearchWidget}
                            />
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
