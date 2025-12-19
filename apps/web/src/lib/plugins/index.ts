import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { seoPlugin } from '@payloadcms/plugin-seo';
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import type { Plugin } from 'payload';

import { isLocale } from '@/i18n/localized-collections';
import { getServerSideURL } from '@/lib/utilities/get-url';
import type { Article, Page } from '@/payload-types';

const generateTitle: GenerateTitle<Article | Page> = ({ doc }) => {
    return doc?.title ? `${doc.title} | Oak Boilerplate` : 'Oak Boilerplate';
};

const generateURL: GenerateURL<Article | Page> = ({ doc, locale }) => {
    const url = getServerSideURL();
    const validatedLocale = isLocale(locale) ? locale : undefined;

    // TODO: Skal vi også exclude default locale hvis det er det som er valgt?
    return doc?.slug ? `${url}${validatedLocale ? `/${validatedLocale}` : ''}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
    nestedDocsPlugin({
        collections: ['article-categories'],
        generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seoPlugin({
        generateTitle,
        generateURL,
    }),
    payloadCloudPlugin(),
    vercelBlobStorage({
        // enabled: process.env.NODE_ENV === 'production',
        enabled: true,
        // Specify which collections should use Vercel Blob
        collections: {
            media: true,
        },
        // Token provided by Vercel once Blob storage is added to your Vercel project
        token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
];
