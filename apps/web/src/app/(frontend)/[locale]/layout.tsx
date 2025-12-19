import { AdminBar } from '@/components/molecules/admin/AdminBar';
import HeadScripts from '@/components/organisms/global/head/HeadScripts';
import Header from '@/components/organisms/global/header/Header';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { getDefaultOgImage, metadataIcons } from '@/lib/data/metadata';
import { Providers } from '@/lib/providers/Providers';
import { getServerSideURL } from '@/lib/utilities/get-url';
import { cn } from '@/lib/utilities/ui';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Dela_Gothic_One, Inclusive_Sans, Roboto } from 'next/font/google';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React, { type ReactNode } from 'react';
import '../globals.scss';
import { Footer } from '@/components/organisms/global/footer/Footer';

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

const delaGothicOne = Dela_Gothic_One({
    weight: ['400'],
    variable: '--font-dela-gothic-one',
    style: ['normal'],
    subsets: ['latin'],
});

const inclusiveSans = Inclusive_Sans({
    weight: ['300', '400', '700'],
    variable: '--font-inclusive-sans',
    style: ['normal'],
    subsets: ['latin'],
});

export default async function RootLayout({ children, params }: Props) {
    const { isEnabled } = await draftMode();
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <html className={cn(delaGothicOne.variable, inclusiveSans.variable)} lang={locale} suppressHydrationWarning>
            <head>
                <HeadScripts />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
            </head>
            <body className="pt-(--header-height) md:pt-(--header-height-desktop)">
                {/* <body className="pt-[calc(var(--header-height)+var(--space-xs))] md:pt-[calc(var(--header-height-desktop)+var(--space-m))]"> */}
                <Providers>
                    <Header locale={locale} />
                    {children}
                    <Footer locale={locale ?? defaultLocale} />
                </Providers>

                <AdminBar
                    adminBarProps={{
                        preview: isEnabled,
                    }}
                />
            </body>
        </html>
    );
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const meta: Metadata = {};
    const { locale } = await params;

    if (!isLocale(locale)) return meta;

    meta.metadataBase = new URL(getServerSideURL());
    meta.icons = metadataIcons;

    const ogImage = await getDefaultOgImage(locale);
    if (ogImage) meta.openGraph = ogImage;

    return meta;
};
