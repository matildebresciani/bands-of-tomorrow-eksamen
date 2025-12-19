import { LivePreviewListener } from '@/components/molecules/admin/LivePreviewListener';
import { RenderBlocks } from '@/components/organisms/blocks/RenderBlocks';
import { defaultLocale, isLocale } from '@/i18n/localized-collections';
import { generateEntryMetadata } from '@/lib/data/metadata';
import { getCachedEntryBySlug } from '@/lib/data/payload/get-cached-entry-by-slug';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ slug: string; locale: string }>;
};

export default async function Page({ params }: Props) {
    const { slug = '', locale } = await params;
    const { isEnabled: draft } = await draftMode();

    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;
    setRequestLocale(validatedLocale);

    // Fetch article
    const article = await getCachedEntryBySlug({
        collection: 'articles',
        slug,
        locale: validatedLocale,
    });

    // 404 hvis artikel ikke findes
    if (!article) return notFound();

    // 404 hvis det IKKE er en anmeldelse
    if (article.articleType !== 'interview') return notFound();

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

// gør siden statisk i production
export const dynamic = 'force-dynamic';

// SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const validatedLocale = locale && isLocale(locale) ? locale : defaultLocale;

    if (!slug) notFound();

    return generateEntryMetadata(slug, 'articles', validatedLocale);
}
