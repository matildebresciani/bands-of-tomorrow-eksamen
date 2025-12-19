import { type Locale, defaultLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import type { CollectionSlug, Where, WhereField } from 'payload';
import { cache } from 'react';

type Props<C extends CollectionSlug> = {
    collection: C;
    ids: string[] | undefined;
    locale?: Locale;
    limit?: number;
    whereFields?: Partial<Where>;
};

export const getCachedEntriesByIds = cache(async <C extends CollectionSlug>(props: Props<C>) => {
    const { collection, ids, locale, whereFields, limit } = props;
    const { isEnabled: draft } = await draftMode();
    const payload = await initPayload();

    if (!ids || ids.length === 0) return null;

    const where: Where = {
        id: {
            in: ids,
        },
        publishStatus: {
            equals: 'public',
        },
        ...whereFields,
    };

    if (draft) {
        const result = await payload.find({
            collection,
            draft,
            limit,
            overrideAccess: draft,
            locale: locale,
            pagination: false,
            where,
        });

        return result.docs || null;
    }

    return unstable_cache(
        async () => {
            const result = await payload.find({
                collection,
                draft: false,
                limit,
                overrideAccess: false,
                locale: locale,
                pagination: false,
                where,
            });

            return result.docs || null;
        },
        [`${collection}-by-id`, ...ids, locale ?? defaultLocale],
        {
            tags: [...ids.map((id) => `${collection}-by-id_${id}`), collection],
        },
    )();
});
