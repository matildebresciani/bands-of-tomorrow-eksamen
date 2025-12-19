import type { Locale, RoutedCollectionSlug } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { formatLinkByCollection } from '@/lib/utilities/format-link';
import { unstable_cache } from 'next/cache';

export const getCachedSitemap = async (collection: RoutedCollectionSlug, locale: Locale) => {
    const payload = await initPayload();

    return unstable_cache(
        async () => {
            const SITE_URL =
                process.env.NEXT_PUBLIC_SERVER_URL ||
                process.env.VERCEL_PROJECT_PRODUCTION_URL ||
                'https://example.com';

            const results = await payload.find({
                collection,
                overrideAccess: false,
                draft: false,
                depth: 0,
                limit: 1000,
                pagination: false,
                locale,
                where: {
                    publishStatus: {
                        equals: 'public',
                    },
                },
                select: {
                    slug: true,
                    updatedAt: true,
                },
            });

            const dateFallback = new Date().toISOString();

            const sitemap = results.docs
                ? results.docs.map((post) => {
                      const link = formatLinkByCollection(post.slug, collection, locale);
                      return {
                          loc: `${SITE_URL}${link}`,
                          lastmod: post.updatedAt || dateFallback,
                      };
                  })
                : [];

            return sitemap;
        },
        [`${collection}-sitemap`, locale],
        {
            tags: [`${collection}-sitemap`, locale],
        },
    )();
};
