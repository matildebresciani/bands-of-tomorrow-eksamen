import { Heading } from '@/components/atoms/frontend/heading/Heading';
import BaseBlock from '@/components/organisms/blocks/base-block/BaseBlock';
import GalleryGrid from '@/components/organisms/gallery/GalleryGrid';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { generateEntryMetadata } from '@/lib/data/metadata';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import type { Media } from '@/payload-types';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { slug, locale } = await params;

    const validatedLocale = isLocale(locale) ? locale : defaultLocale;
    setRequestLocale(validatedLocale);

    const payload = await initPayload();

    const res = await payload.find({
        collection: 'galleries',
        where: {
            slug: { equals: slug },
        },
        limit: 1,
        depth: 2, // vigtigt for media + photographer
    });

    const gallery = res.docs[0];
    if (!gallery) return notFound();

    const images = gallery.images?.filter((image): image is Media => typeof image === 'object') ?? [];

    const photographer = typeof gallery.photographer === 'object' ? gallery.photographer : null;

    return (
        <article className="pt-section-xs md:pt-section-m pb-spacing-l">
            <BaseBlock>
                <div className="oakgrid gap-y-section-xxs">
                    <div className="col-span-12 space-y-section-xxs">
                        <Heading>{gallery.title}</Heading>

                        <div className="flex flex-col">
                            {gallery.galleryDate && <span>{formatDateTime(gallery.galleryDate, 'long')}</span>}
                            {photographer && <span>Foto: {photographer.volunteerName}</span>}
                            {gallery.venue && <span>Spillested: {gallery.venue}</span>}
                        </div>
                    </div>

                    <GalleryGrid images={images} galleryTitle={gallery.title} className="col-span-12" />
                </div>
            </BaseBlock>
        </article>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;
    if (!slug) notFound();
    return generateEntryMetadata(slug, 'galleries', validatedLocale);
}
