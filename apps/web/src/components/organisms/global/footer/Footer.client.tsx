'use client';
import Facebook from '@/components/atoms/frontend/icons/Facebook';
import Instagram from '@/components/atoms/frontend/icons/Instagram';
import LogoLink from '@/components/atoms/frontend/logo/Link';
import type { Navigation as NavigationProps } from '@/payload-types';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import BaseBlock from '../../blocks/base-block/BaseBlock';
import Navigation from './components/Navigation';

interface FooterClientProps {
    footer1?: NavigationProps['navItems'] | null;
    footer2?: NavigationProps['navItems'] | null;
    footer3?: NavigationProps['navItems'] | null;
}

export const FooterClient: React.FC<FooterClientProps> = ({ footer1, footer2, footer3 }) => {
    return (
        <footer className="relative mt-auto z-20">
            <BaseBlock className="flex flex-col gap-10 py-8 md:py-8 bg-bg-base items-center z-21">
                <LogoLink variant="full" className="relative z-50" />
                <div className="absolute bottom-0 bg-bg-highlight w-full h-[80%] lg:h-[75%] z-22" />
                <div className="flex flex-col gap-5 text-button-text text-center z-23 uppercase">
                    {footer1 && <Navigation data={footer1} />}
                    {footer2 && <Navigation data={footer2} />}
                    {footer3 && <Navigation data={footer3} />}
                </div>
                <div className="flex gap-5 z-23">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Link href="https://www.instagram.com/bandsoftomorrow/?hl=en">
                            <Instagram />
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Link href="https://www.facebook.com/bandsoftomorrow/">
                            <Facebook />
                        </Link>
                    </motion.div>
                </div>
            </BaseBlock>
        </footer>
    );
};
