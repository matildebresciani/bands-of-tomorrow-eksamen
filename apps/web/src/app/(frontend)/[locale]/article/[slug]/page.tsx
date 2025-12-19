//TODO: Slet denne side hvis den ikke skal bruges

import { LivePreviewListener } from '@/components/molecules/admin/LivePreviewListener';
import { RenderBlocks } from '@/components/organisms/blocks/RenderBlocks';
import { Footer } from '@/components/organisms/global/footer/Footer';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { generateEntryMetadata } from '@/lib/data/metadata';
import { getCachedEntryBySlug } from '@/lib/data/payload/get-cached-entry-by-slug';
import type { CollectionPostType } from '@/lib/types/collection-page';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
type Props = {
    params: Promise<{ slug: string; locale: string }>;
};

export default async function Page({ params }: Props) {
    const { slug = '', locale } = await params;
    const { isEnabled: draft } = await draftMode();
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;
    const article = await getCachedEntryBySlug({ collection: 'articles', slug, locale: validatedLocale });
    if (!article) return notFound();
    setRequestLocale(validatedLocale);
    const { id, layout } = article;
    return (
        <>
            {draft && <LivePreviewListener />}
            <article>
                {layout && (
                    <RenderBlocks pageId={id} blocks={layout} locale={validatedLocale} collectionType="articles" />
                )}
            </article>
        </>
    );
}
export const dynamic = 'force-static';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;
    if (!slug) notFound();
    return generateEntryMetadata(slug, 'articles', validatedLocale);
}
