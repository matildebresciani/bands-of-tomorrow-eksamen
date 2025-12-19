import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales, localizedCollections, paginationTranslations } from './localized-collections';

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
            en: `/${localizedCollections['article-categories'].en}/`,
            da: `/${localizedCollections['article-categories'].da}/`,
        },
        '/articles/page/[pageNumber]': {
            en: `/${localizedCollections['article-categories'].en}/${paginationTranslations.page.en}/[pageNumber]`,
            da: `/${localizedCollections['article-categories'].da}/${paginationTranslations.page.da}/[pageNumber]`,
        },
        '/articles/[slug]': {
            en: `/${localizedCollections['article-categories'].en}/[slug]`,
            da: `/${localizedCollections['article-categories'].da}/[slug]`,
        },
        '/articles/[slug]/page/[pageNumber]': {
            en: `/${localizedCollections['article-categories'].en}/[slug]/${paginationTranslations.page.en}/[pageNumber]`,
            da: `/${localizedCollections['article-categories'].da}/[slug]/${paginationTranslations.page.da}/[pageNumber]`,
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
