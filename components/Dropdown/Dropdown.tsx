import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import type { FunctionComponent, PropsWithChildren, ReactNode, SVGProps } from 'react';
import { Fragment } from 'react';

import { IconCaret } from '@/icons';
import { Button } from '@/ui';
import { makeComposableComponent } from '@/utils';

import Item from './DropdownItem';

import styles from './Dropdown.module.scss';

type Props = {
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: ReactNode;
    className?: string;
    menuClassName?: string;
    buttonClassName?: string;
    withMobileDisplay?: boolean;
    buttonContentClassName?: string;
};

function Dropdown({
    icon,
    label,
    className,
    menuClassName,
    buttonClassName,
    buttonContentClassName,
    withMobileDisplay,
    children,
}: PropsWithChildren<Props>) {
    return (
        <Menu as="div" className={classNames(styles.container, className)}>
            {({ open }) => (
                <>
                    <Menu.Button as={Fragment}>
                        <Button
                            variation="navigation"
                            icon={icon}
                            className={classNames(buttonClassName, {
                                [styles.buttonWithMobileDisplay]: withMobileDisplay,
                            })}
                            contentClassName={buttonContentClassName}
                        >
                            {label}
                            <IconCaret
                                width={12}
                                height={12}
                                className={classNames(styles.caret, { [styles.caretOpen]: open })}
                            />
                        </Button>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter={styles.transition}
                        enterFrom={styles.transitionOpenStart}
                        enterTo={styles.transitionOpenFinish}
                        leave={styles.transition}
                        leaveFrom={styles.transitionOpenFinish}
                        leaveTo={styles.transitionOpenStart}
                    >
                        <Menu.Items
                            as="ul"
                            className={classNames(styles.menu, menuClassName, {
                                [styles.withMobileDisplay]: withMobileDisplay,
                            })}
                        >
                            {children}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}

export default makeComposableComponent(Dropdown, { Item });
