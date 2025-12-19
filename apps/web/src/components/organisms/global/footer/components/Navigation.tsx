import { formatLink } from '@/lib/utilities/format-link';
import { cn } from '@/lib/utilities/ui';
import type { Navigation as NavigationProps } from '@/payload-types';
import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    data: NavigationProps['navItems'];
};

const Navigation = ({ data }: Props) => {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex flex-col gap-5">
                {data?.map((item, i) => {
                    const itemLink = formatLink(item.link, locale);
                    return (
                        <motion.li key={item.id ?? i} whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}>
                            <Link
                                href={itemLink}
                                className={cn('hover:underline link-text', itemLink === pathname && 'underline')}
                                target={item.link.openNewTab ? '_blank' : '_self'}
                            >
                                {item.link.label}
                            </Link>
                        </motion.li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
