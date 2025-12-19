'use client';

import LogoLink from '@/components/atoms/frontend/logo/Link';
import SearchBar from '@/components/molecules/frontend/SearchBar';
import type { Locale } from '@/i18n/localized-collections';
import type { Navigation } from '@/payload-types';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import BaseBlock from '../../blocks/base-block/BaseBlock';
import MainNavigation from './components/MainNavigation';
import MobileNavigation from './components/MobileNavigation';

type Props = {
    main?: Navigation['navItems'] | null;
    secondary?: Navigation['navItems'] | null;
    mobile?: Navigation['navItems'] | null;
    locale: Locale;
};

export default function HeaderClient({ main, mobile, locale }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

    const isMobile = vw < 768;
    const isTablet = vw >= 768 && vw < 1024;
    const isDesktop = vw >= 1024;

    const getCSSVar = (name: string, fallback = 0) => {
        if (typeof window === 'undefined') return fallback;
        const value = getComputedStyle(document.documentElement).getPropertyValue(name);
        return Number.parseInt(value.replace('px', '').trim()) || fallback;
    };

    const heights = {
        desktop: {
            large: getCSSVar('--header-height-desktop', 220),
            small: getCSSVar('--header-height-desktop-offset', 140),
        },
        tablet: { large: getCSSVar('--header-height', 220), small: getCSSVar('--header-height-offset', 110) },
        mobile: { large: getCSSVar('--header-height', 72), small: getCSSVar('--header-height-offset', 72) },
    };

    const headerHeight = isDesktop ? (scrolled ? heights.desktop.small : heights.desktop.large) : heights.mobile.large;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-bg-base"
            animate={{ height: headerHeight }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ willChange: 'height' }}
        >
            <BaseBlock classNameOuter="!pb-0">
                <div className="oakgrid">
                    <div className="col-span-12 relative h-full">
                        {/* DESKTOP GRID LAYOUT */}
                        <div
                            className="
                                hidden lg:grid 
                                w-full h-full 
                                grid-cols-1 
                                transition-all duration-300
                            "
                            style={{
                                gridTemplateRows: scrolled
                                    ? 'var(--header-rows-desktop-small)'
                                    : 'var(--header-rows-desktop-large)',
                            }}
                        >
                            {/* Række 1 — Logo området */}
                            <div className="flex items-center justify-center relative">
                                {/* FULL LOGO */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        opacity: scrolled ? 0 : 1,
                                        y: scrolled ? -20 : 0,
                                        scale: scrolled ? 0.75 : 1,
                                    }}
                                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="z-30 max-w-[420px]"
                                >
                                    <LogoLink variant="full" />
                                </motion.div>

                                {/* SMALL LOGO */}
                                {scrolled && (
                                    <motion.div
                                        className="absolute left-1/2 -translate-x-1/2 z-40"
                                        initial={{ opacity: 0, y: -6, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 0.85 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.35,
                                            ease: [0.25, 0.1, 0.25, 1],
                                            delay: 0.1,
                                        }}
                                        style={{ top: 12 }} // tweak efter smag
                                    >
                                        <LogoLink />
                                    </motion.div>
                                )}
                            </div>

                            {/* Række 2 — Navigation */}
                            <div className="flex w-full items-center justify-between">
                                {/* Navigation – får lov at fylde pladsen, men centreres vertikalt */}
                                <nav className="flex items-center">
                                    {main && <MainNavigation data={main} locale={locale} />}
                                </nav>

                                {/* Search – alignes i midten og får stabil klik-flade */}
                                <div className="flex items-center justify-center pl-s">
                                    <SearchBar />
                                </div>
                            </div>
                        </div>

                        {/* MOBILE + TABLET LAYOUT */}
                        <div className="flex lg:hidden items-center justify-between w-full h-full py-m">
                            {/* Full logo */}
                            {/* <motion.div animate={{ opacity: scrolled ? 0 : 1 }} transition={{ duration: 0.25 }}>
                                <LogoLink variant="full" />
                            </motion.div> */}

                            {/* Small logo */}
                            {/* <motion.div
                                className="absolute left-4"
                                animate={{
                                    opacity: scrolled ? 1 : 0,
                                    scale: scrolled ? 0.85 : 1,
                                }}
                                transition={{ duration: 0.25 }}
                            >
                                <LogoLink />
                            </motion.div> */}

                            <div className="flex items-center">
                                <LogoLink />
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-base">
                                <SearchBar />
                                {mobile && <MobileNavigation data={mobile} locale={locale} />}
                            </div>
                        </div>
                    </div>
                </div>
            </BaseBlock>
        </motion.header>
    );
}
