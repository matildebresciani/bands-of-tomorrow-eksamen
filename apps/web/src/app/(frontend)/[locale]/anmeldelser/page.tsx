import { Heading } from '@/components/atoms/frontend/heading/Heading';
import ArticlesArchive from '@/components/organisms/articles-archive/ArticlesArchive';
import FilterBar from '@/components/organisms/articles-archive/FilterBar';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { getCachedCollection } from '@/lib/data/payload/get-cached-collection';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
    const { locale } = await params;

    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    setRequestLocale(validatedLocale);

    const reviews = await getCachedCollection({
        collection: 'articles',
        whereFields: {
            articleType: { equals: 'review' },
        },
        sort: '-publishedAt',
        limit: 50,
    });

    const payload = await initPayload();
    const genresRes = await payload.find({
        collection: 'genres',
        sort: 'name',
    });

    const genres = genresRes.docs;

    return (
        <article className="pt-section-xs md:pt-section-m pb-spacing-l">
            <BaseBlock>
                <div className="oakgrid">
                    <div className="col-span-12 space-y-section-xxs">
                        <Heading>Anmeldelser</Heading>
                        {/* TODO: Filtrering */}
                        <FilterBar articles={reviews.docs} genres={genres} />
                        {/* <ArticlesArchive articles={reviews.docs} /> */}
                    </div>
                </div>
            </BaseBlock>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Anmeldelser',
    };
};
