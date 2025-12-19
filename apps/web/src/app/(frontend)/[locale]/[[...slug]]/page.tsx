import { LivePreviewListener } from '@/components/molecules/admin/LivePreviewListener';
import { RenderBlocks } from '@/components/organisms/blocks/RenderBlocks';
import { Footer } from '@/components/organisms/global/footer/Footer';
import { type Locale, defaultLocale, isLocale } from '@/i18n/localized-collections';
import { generateEntryMetadata } from '@/lib/data/metadata';
import { getCachedEntryById } from '@/lib/data/payload/get-cached-entry-by-id';
import { getCachedEntryBySlug } from '@/lib/data/payload/get-cached-entry-by-slug';
import { getCachedGlobal } from '@/lib/data/payload/get-cached-globals';
import type { CollectionPageType } from '@/lib/types/collection-page';
import type { Page as PageType } from '@/payload-types';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Page({ params: paramsPromise }: CollectionPageType) {
    const { isEnabled: draft } = await draftMode();
    const { slug: slugParam = [''], locale } = await paramsPromise;
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    const slug = slugParam.join('/');

    let page: PageType | null;

    if (slug === '') {
        page = await fetchHomepage(validatedLocale);
    } else {
        page = await getCachedEntryBySlug({ collection: 'pages', slug, locale: validatedLocale });
    }

    if (!page) {
        return notFound();
    }

    setRequestLocale(validatedLocale);

    const { id, layout } = page;

    return (
        <>
            {/** TODO: Skulle man, når vi får tilføjet redirects, lave en funktion som automatisk opretter et redirect hvis man ændrer i sluggen på en published side? */}
            {draft && <LivePreviewListener />}

            <article>
                {layout && <RenderBlocks pageId={id} blocks={layout} locale={validatedLocale} collectionType="pages" />}
            </article>
        </>
    );
}

export const dynamic = 'force-static';

const fetchHomepage = async (locale?: Locale) => {
    const options = await getCachedGlobal('options', locale ?? defaultLocale);
    let homepageId: string;

    if (typeof options.defaultPages?.homepage === 'string') {
        homepageId = options.defaultPages.homepage;
    } else if (typeof options.defaultPages?.homepage === 'object') {
        homepageId = options.defaultPages.homepage.id;
    } else {
        notFound();
    }

    return await getCachedEntryById({
        collection: 'pages',
        id: homepageId,
        locale: locale ?? defaultLocale,
    });
};

export const generateMetadata = async ({ params: paramsPromise }: CollectionPageType): Promise<Metadata> => {
    const { slug: slugParam = [''], locale } = await paramsPromise;
    const slug = slugParam.join('/');
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    let page: PageType | null | undefined;

    if (slug === '') {
        const fetchedHomepage = await fetchHomepage(validatedLocale);
        page = fetchedHomepage;
    } else {
        page = await getCachedEntryBySlug({ collection: 'pages', slug, locale: validatedLocale });
    }

    if (!page?.slug) return {};

    return generateEntryMetadata(page.slug, 'pages', validatedLocale);
};
