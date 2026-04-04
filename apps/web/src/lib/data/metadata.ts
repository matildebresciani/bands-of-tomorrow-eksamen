import {
    type Locale,
    type RoutedCollectionSlug,
    defaultLocale,
} from '@/i18n/localized-collections';
import type { Metadata } from 'next';
import { initPayload } from '../config';
import { trimTrailingSlash } from '../utilities/composables';
import { formatLinkByCollection } from '../utilities/format-link';
import { getServerSideURL } from '../utilities/get-url';
import { getCachedEntryBySlug } from './payload/get-cached-entry-by-slug';
import { getCachedGlobal } from './payload/get-cached-globals';
import { getCachedOptions } from './payload/get-cached-options';
import { getImageSlugFromMedia } from './payload/get-image-url';

export const metadataIcons = {
    icon: [{ url: '/favicon.ico' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon-180x180.png', sizes: '180x180' }],
};

export const getDefaultOgImage = async (locale: Locale) => {
    const [payload, options] = await Promise.all([initPayload(), getCachedGlobal('options', locale)]);

    if (options.meta?.defaultImage) {
        const image = options.meta.defaultImage;

        if (typeof image === 'object' && image.url) {
            return {
                images: [
                    {
                        url: `${trimTrailingSlash(getServerSideURL())}${image.url}`,
                    },
                ],
            };
        }

        if (typeof image === 'string') {
            const defaultOgImage = await payload.findByID({
                collection: 'media',
                id: image,
                locale,
            });

            if (defaultOgImage.url) {
                return {
                    images: [
                        {
                            url: `${trimTrailingSlash(getServerSideURL())}${defaultOgImage.url}`,
                        },
                    ],
                };
            }
        }
    }

    return null;
};

type CollectionSingleTypes = 'pages' | 'articles' | 'galleries';
export const generateEntryMetadata = async (slug: string, collection: CollectionSingleTypes, locale: Locale) => {
    const meta: Metadata = {};
    const options = await getCachedOptions(locale);

    const entry = await getCachedEntryBySlug({
        collection: collection,
        slug: slug,
        locale: locale,
    });

    if (!entry) return meta;

    meta.title = `${options.meta?.metaTitlePrefix ?? ''}${entry.meta?.title?.length ? entry.meta.title : entry.title}${options.meta?.metaTitleSuffix ?? ''}`;
    if (entry.meta?.description) meta.description = entry.meta.description;

    if (entry.meta?.image) {
        const imageSlug = await getImageSlugFromMedia(entry.meta.image, locale);
        if (imageSlug) {
            const imagePath = imageSlug.startsWith('/')
                ? `${trimTrailingSlash(getServerSideURL())}${imageSlug}`
                : imageSlug;

            meta.openGraph = {
                images: [
                    {
                        url: imagePath,
                    },
                ],
            };
        }
    }

    if (entry.slug) {
        meta.alternates = {
            canonical: formatLinkByCollection(entry.slug, collection, locale),
        };
    }

    return meta;
};
