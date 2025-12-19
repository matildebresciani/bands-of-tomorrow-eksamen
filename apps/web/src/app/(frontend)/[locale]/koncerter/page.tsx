import { Heading } from '@/components/atoms/frontend/heading/Heading';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import ConcertsList from '@/components/organisms/concerts-list/ConcertsList';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
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

    const payload = await initPayload();

    const concerts = await payload.find({
        collection: 'concerts',
        sort: 'date',
        limit: 50,
    });

    return (
        <article className="pt-section-xs md:pt-section-m pb-spacing-l">
            <BaseBlock>
                <div className="oakgrid gap-y-section-xxs">
                    <Heading className="col-span-12">Koncertkalender</Heading>
                    <p className="md:justify-center col-span-12 md:col-start-3 md:col-span-8">
                        Udvalgte koncerter anbefalet af Band of Tomorrows skribenter og redaktion. Opdateres løbende.
                        Vær opmærksom på at titlen på arrangementerne ikke nødvendigvis opdateres efter, at der er sket
                        eventuelle ændringer ifm. lineups eller venues.
                    </p>
                    <ConcertsList concerts={concerts.docs} className="col-span-12" />
                </div>
            </BaseBlock>
        </article>
    );
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Koncerter',
    };
};
