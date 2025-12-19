import { locales } from '@/i18n/localized-collections';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

    return {
        rules: [
            {
                userAgent: '*',
                disallow: ['*?_rsc=*', '*?*%2C*', '*%2C*', '*,*', '/admin', '/api/*', '/next/*'],
            },
            {
                userAgent: 'Googlebot',
                disallow: ' ',
            },
            {
                userAgent: 'Googlebot-image',
                disallow: ' ',
            },
        ],
        sitemap: [
            ...locales.map((locale) => `${baseUrl}/sitemaps/${locale}/pages.xml`),
            ...locales.map((locale) => `${baseUrl}/sitemaps/${locale}/articles.xml`),
        ],
    };
}
