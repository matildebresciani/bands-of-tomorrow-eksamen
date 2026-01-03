'use client';

import type { Locale } from '@/i18n/localized-collections';
import { formatLink } from '@/lib/utilities/format-link';
import { cn } from '@/lib/utilities/ui';
import type { Navigation } from '@/payload-types';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    data: Navigation['navItems'] | null;
    locale: Locale;
};

const MainNavigation = ({ data, locale }: Props) => {
    const pathname = usePathname();

    return (
        <nav className="flex sm:gap-s md:gap-m items-center nav-text text-center">
            {data?.map((item, i) => {
                const itemLink = formatLink(item.link, locale);
                return (
                    <motion.div
                        key={item.id ?? i}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            href={itemLink}
                            className={cn(
                                'hover:text-bg-highlight nav-text',
                                itemLink === pathname &&
                                    'bg-bg-highlight h-fit text-button-text hover:text-button-text',
                            )}
                            target={item.link.openNewTab ? '_blank' : '_self'}
                        >
                            {item.link.label}
                        </Link>
                    </motion.div>
                );
            })}
        </nav>
    );
};

export default MainNavigation;
