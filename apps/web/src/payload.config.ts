import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultLexical } from '@/components/molecules/admin/fields/defaultLexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import { da } from '@payloadcms/translations/languages/da';
import { en } from '@payloadcms/translations/languages/en';
import { type PayloadRequest, buildConfig } from 'payload';
// storage-adapter-import-placeholder
import sharp from 'sharp'; // sharp-import
import { Icons } from './collections/assets/icons/config';
import { Media } from './collections/assets/media/config';
import { ArticleCategories } from './collections/categories/article-categories/config';
import { Genres } from './collections/categories/article-genres/config';
import { Articles } from './collections/content/articles/config';
import { Concerts } from './collections/content/concerts/config';
import { Pages } from './collections/content/pages/config';
import { Faqs } from './collections/entries/faqs/config';
import { Forms } from './collections/entries/forms/config';
import { Quotes } from './collections/entries/quotes/config';
import { Volunteers } from './collections/team/volunteers/config';
import { ApiKeys } from './collections/tools-settings/api-keys/config';
import { Navigation } from './collections/tools-settings/navigation/config';
import { Options } from './collections/tools-settings/options/config';
import { Redirects } from './collections/tools-settings/redirects/config';
import { Users } from './collections/tools-settings/users/config';
import { defaultLocale, locales } from './i18n/localized-collections';
import { plugins } from './lib/plugins';
import { getServerSideURL } from './lib/utilities/get-url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        components: {
            afterDashboard: ['@/components/molecules/admin/AfterDashboard'],
        },
        importMap: {
            baseDir: path.resolve(dirname),
        },
        user: Users.slug,
        livePreview: {
            breakpoints: [
                {
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375,
                    height: 667,
                },
                {
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768,
                    height: 1024,
                },
                {
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440,
                    height: 900,
                },
            ],
        },
    },
    // This config helps us configure global or default features that the other editors can inherit
    editor: defaultLexical,
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
    collections: [
        Pages,
        Articles,
        Concerts,
        ArticleCategories,
        Genres,
        Volunteers,
        Media,
        Icons,
        Faqs,
        Quotes,
        Navigation,
        Redirects,
        Users,
        ApiKeys,
        Forms,
    ],
    cors: [getServerSideURL()].filter(Boolean),
    globals: [Options],
    plugins: [
        ...plugins,
        // storage-adapter-placeholder
    ],
    secret: process.env.PAYLOAD_SECRET,
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    jobs: {
        access: {
            run: ({ req }: { req: PayloadRequest }): boolean => {
                // Allow logged in users to execute this endpoint (default)
                if (req.user) return true;

                // If there is no logged in user, then check
                // for the Vercel Cron secret to be present as an
                // Authorization header:
                const authHeader = req.headers.get('authorization');
                return authHeader === `Bearer ${process.env.CRON_SECRET}`;
            },
        },
        tasks: [],
    },
    i18n: {
        supportedLanguages: { en, da },
        fallbackLanguage: defaultLocale,
    },
    localization: {
        defaultLocale,
        locales: [...locales],
    },
    compatibility: {
        allowLocalizedWithinLocalized: true,
    },
    email: resendAdapter({
        defaultFromAddress: 'delivered@resend.dev',
        defaultFromName: 'Bands of Tomorrow',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
});
