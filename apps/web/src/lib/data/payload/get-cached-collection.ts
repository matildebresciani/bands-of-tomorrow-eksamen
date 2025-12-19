import { type Locale, type RoutedCollectionSlug, defaultLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import type { Where } from 'payload';
import { cache } from 'react';

type Props<C extends RoutedCollectionSlug> = {
    collection: C;
    locale?: Locale;
    limit?: number;
    page?: number;
    sort?: string;
    whereFields?: Partial<Where>;
};

export const getCachedCollection = cache(async <C extends RoutedCollectionSlug>(props: Props<C>) => {
    const { collection, locale, limit = 10, page = 1, sort = 'title', whereFields } = props;
    const { isEnabled: draft } = await draftMode();

    const where: Where = {
        publishStatus: {
            equals: 'public',
        },
        ...whereFields,
    };

    if (draft) {
        const payload = await initPayload();
        const result = await payload.find({
            collection,
            limit,
            page,
            sort,
            draft,
            overrideAccess: draft,
            locale,
            where,
            depth: 2,
        });

        return result || null;
    }

    return unstable_cache(
        async ({ collection, limit, page, sort, locale }: Props<C>, where: Where) => {
            const payload = await initPayload();
            const result = await payload.find({
                collection,
                limit,
                page,
                sort,
                draft: false,
                overrideAccess: false,
                locale,
                where,
                // depth: 2,
            });

            return result || null;
        },
        [],
        {
            tags: [collection],
        },
    )({ collection, limit, page, sort, locale }, where);
});
