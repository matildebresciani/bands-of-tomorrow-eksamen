'use client';

import Close from '@/components/atoms/frontend/buttons/Close';
import Portal from '@/components/molecules/Portal';
import type { Locale } from '@/i18n/localized-collections';
import { formatLink } from '@/lib/utilities/format-link';
import { cn } from '@/lib/utilities/ui';
import type { Navigation } from '@/payload-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BurgerButton from '../../../../atoms/frontend/buttons/BurgerButton';

type Props = {
    data: Navigation['navItems'] | null;
    locale: Locale;
};

const MobileNavigation = ({ data, locale }: Props) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isMenuOpen]);

    return (
        <>
            <BurgerButton isOpen={isMenuOpen} onClick={(open) => setIsMenuOpen(open)} />
            <Portal>
                <div
                    className={cn(
                        'dvh-screen fixed top-0 left-0 flex flex-col gap-s p-m w-screen bg-bg-base z-30 transition bg-bg-base',
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full',
                    )}
                >
                    {/* <div className="flex justify-end">
                        <Close onClick={() => setIsMenuOpen(false)} />
                    </div> */}
                    <div className="flex flex-col gap-5 items-start mt-[var(--header-height)]">
                        {data?.map((item, i) => {
                            const itemLink = formatLink(item.link, locale);
                            return (
                                <Link
                                    key={item.id ?? i}
                                    href={itemLink}
                                    className={cn(
                                        'nav-text',
                                        itemLink === pathname && 'bg-bg-highlight h-fit text-button-text p-1',
                                    )}
                                    target={item.link.openNewTab ? '_blank' : '_self'}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </Portal>
        </>
    );
};

export default MobileNavigation;
