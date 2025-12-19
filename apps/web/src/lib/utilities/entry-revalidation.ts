import {
    type RoutedCollectionSlug,
    isRoutedCollection,
    locales,
    routedCollections,
} from '@/i18n/localized-collections';
import type { Article, Page } from '@/payload-types';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionSlug } from 'payload';
import { formatLinkByCollection } from './format-link';

export const revalidateEntry = (doc: Page | Article, collection: CollectionSlug) => {
    if (isRoutedCollection(collection)) {
        const localizedPaths = locales.map((locale) => formatLinkByCollection(doc.slug, collection, locale));
        console.log(`Revalidating ${collection} at path: ${doc.slug}`);
        localizedPaths.forEach((path) => revalidatePath(path));
    }

    // Revalidating entire collection to hit the archive page
    revalidateTag(collection);
    revalidateTag(`${collection}-sitemap`);
    revalidateTag(`${collection}-by-id_${doc.id}`);
    revalidateTag(`${collection}-by-slug_${doc.slug}`);
};
