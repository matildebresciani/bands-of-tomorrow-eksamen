import { isLocale } from '@/i18n/localized-collections';
import type { CollectionSlug, PayloadRequest } from 'payload';

const articleTypePrefix = {
    review: '/anmeldelser',
    interview: '/interviews',
    'weekly-releases': '/ugens-udgivelser',
};

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    articles: '',
    pages: '',
};

type Props = {
    collection: keyof typeof collectionPrefixMap;
    slug: string;
    req: PayloadRequest;
    locale?: string;
    articleType?: 'review' | 'interview' | 'weekly-releases';
};

export const generatePreviewPath = ({ collection, slug, req, locale, articleType }: Props) => {
    const validatedLocale = isLocale(locale) ? locale : 'da';

    // ⭐ USE articleTypePrefix WHEN collection === "articles"

    const prefix =
        collection === 'articles'
            ? (articleTypePrefix[articleType as keyof typeof articleTypePrefix] ?? '/artikel')
            : (collectionPrefixMap[collection] ?? '');

    // Build actual frontend path
    const path = `/${validatedLocale}${prefix}/${slug}`;

    // Send params to /next/preview route
    const params = new URLSearchParams({
        slug,
        collection,
        path,
        locale: validatedLocale,
    });

    const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);

    const protocol = isProduction ? 'https:' : req.protocol;
    const host = req.host;

    return `${protocol}//${host}/next/preview?${params.toString()}`;
};
