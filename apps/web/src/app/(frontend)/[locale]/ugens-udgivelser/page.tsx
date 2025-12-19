import { Heading } from '@/components/atoms/frontend/heading/Heading';
import ArticlesArchive from '@/components/organisms/articles-archive/ArticlesArchive';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
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

    const weeklyReleases = await getCachedCollection({
        collection: 'articles',
        whereFields: {
            articleType: { equals: 'weekly-releases' },
        },
        sort: '-publishedAt',
        limit: 50,
    });

    return (
        <article className="pt-section-xs md:pt-section-m pb-spacing-l">
            <BaseBlock>
                <div className="oakgrid">
                    <div className="col-span-12 space-y-section-xxs">
                        <Heading>Ugens udgivelser</Heading>
                        <ArticlesArchive articles={weeklyReleases.docs} />
                    </div>
                </div>
            </BaseBlock>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Ugens udgivelser',
    };
};
