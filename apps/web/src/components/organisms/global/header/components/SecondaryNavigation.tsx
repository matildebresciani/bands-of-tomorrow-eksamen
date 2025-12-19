'use client';

import type { Locale } from '@/i18n/localized-collections';
import { formatLink } from '@/lib/utilities/format-link';
import { cn } from '@/lib/utilities/ui';
import type { Navigation } from '@/payload-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    data: Navigation['navItems'] | null;
    locale: Locale;
};

const SecondaryNavigation = ({ data, locale }: Props) => {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center gap-5 py-2 bg-gray-200">
            {data?.map((item, i) => {
                const itemLink = formatLink(item.link, locale);
                return (
                    <Link
                        key={item.id ?? i}
                        href={itemLink}
                        className={cn('text-xs hover:underline', itemLink === pathname && 'underline')}
                        target={item.link.openNewTab ? '_blank' : '_self'}
                    >
                        {item.link.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default SecondaryNavigation;
