import { type RoutedCollectionSlug, locales } from '@/i18n/localized-collections';
import { initPayload } from '../config';

export const generateStaticParamsForCollection = async (collection: RoutedCollectionSlug, isCatchAll = false) => {
    const payload = await initPayload();
    const articles = (
        await Promise.all(
            locales.map(async (locale) => {
                const articles = await payload.find({
                    collection,
                    draft: false,
                    limit: 1000,
                    overrideAccess: false,
                    pagination: false,
                    locale,
                });

                return articles.docs.map((post) => ({
                    post,
                    locale,
                }));
            }),
        )
    ).flat();

    if (isCatchAll) {
        const params = articles.map(({ post, locale }) => {
            return { locale, slug: [post.slug] };
        });
        return params;
    }

    const params = articles.map(({ post, locale }) => {
        return { locale, slug: post.slug };
    });

    return params;
};
