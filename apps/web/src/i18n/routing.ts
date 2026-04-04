import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales, localizedCollections, localizedPaths, paginationTranslations } from './localized-collections';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales,

    // Doesn't force a locale prefix when the locale is the default
    localePrefix: 'as-needed',

    // Don't detect the locale from the browser
    localeDetection: false,

    // Used when no locale matches
    defaultLocale: defaultLocale,

    pathnames: {
        '/': '/',
        '/articles': {
            en: `/${localizedPaths.articles.en}/`,
            da: `/${localizedPaths.articles.da}/`,
        },
        '/articles/page/[pageNumber]': {
            en: `/${localizedPaths.articles.en}/${paginationTranslations.page.en}/[pageNumber]`,
            da: `/${localizedPaths.articles.da}/${paginationTranslations.page.da}/[pageNumber]`,
        },
        '/article/[slug]': {
            en: `/${localizedCollections.articles.en}/[slug]`,
            da: `/${localizedCollections.articles.da}/[slug]`,
        },
    },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
