import { type Locale, defaultLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import type { CollectionSlug } from 'payload';
import { cache } from 'react';

type Props<C extends CollectionSlug> = {
    collection: C;
    id: string;
    locale?: Locale;
};

export const getCachedEntryById = cache(async <C extends CollectionSlug>({ collection, id, locale }: Props<C>) => {
    const { isEnabled: draft } = await draftMode();
    // Do not create payload instance here,
    // if database connection is not available, it will throw an error
    // because the payload instance will try to connect to the database
    // If you only create it when it is needed, it will not throw an error and cache correctly
    // 🛑 const payload = await initPayload();

    if (draft) {
        const payload = await initPayload();
        const result = await payload.find({
            collection,
            draft,
            limit: 1,
            overrideAccess: draft,
            locale: locale,
            pagination: false,
            where: {
                id: {
                    equals: id,
                },
                publishStatus: {
                    equals: 'public',
                },
            },
        });

        return result.docs?.[0] || null;
    }

    return unstable_cache(
        async () => {
            const payload = await initPayload();
            const result = await payload.find({
                collection,
                draft: false,
                limit: 1,
                overrideAccess: false,
                locale: locale,
                pagination: false,
                where: {
                    id: {
                        equals: id,
                    },
                    publishStatus: {
                        equals: 'public',
                    },
                },
            });

            return result.docs?.[0] || null;
        },
        [`${collection}-by-id`, id, locale ?? defaultLocale],
        {
            tags: [`${collection}-by-id_${id}`, collection],
        },
    )();
});
