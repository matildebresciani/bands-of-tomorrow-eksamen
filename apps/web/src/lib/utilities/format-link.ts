import {
    type Locale,
    type Path,
    type RoutedCollectionSlug,
    defaultLocale,
    isLocale,
    isLocalizableCollection,
    localizedCollections,
    localizedPaths,
} from '@/i18n/localized-collections';
import type { Navigation } from '@/payload-types';

export type RouteType =
    | {
          slug: string;
          route: RoutedCollectionSlug;
          type?: 'collection';
      }
    | {
          slug?: string;
          route: Path;
          type: 'path';
      };

export const localizePath = (path: Path, locale: Locale) => {
    return `/${localizedPaths[path][locale]}` as const;
};

export const localizeCollection = (collection: RoutedCollectionSlug, locale: Locale, isPlural = false) => {
    if (!isLocalizableCollection(collection)) {
        return '' as const;
    }
    return `/${localizedCollections[collection][locale]}`;
};

export const formatLink = (
    link: Pick<NonNullable<Navigation['navItems']>[number]['link'], 'relation' | 'url' | 'type'>,
    locale: string | undefined,
) => {
    const validatedLocale = isLocale(locale) ? locale : defaultLocale;
    const localePath = validatedLocale === defaultLocale ? ('' as const) : (`/${validatedLocale}` as const);

    if (link.type === 'custom' && link.url) {
        if (link.url.startsWith('/')) return `${localePath}${link.url}`;
        return link.url;
    }

    if (typeof link.relation?.value !== 'object' || link.type !== 'reference' || !link.relation?.value?.slug) {
        return `${localePath}` as const;
    }

    const slug = link.relation.value.slug;
    const slugPath = slug === '/' ? '' : (`/${slug}` as const);
    const collectionPath = localizeCollection(link.relation.relationTo, validatedLocale);

    return `${localePath}${collectionPath}${slugPath}` as const;
};

export const formatLinkByCollection = (
    slug: string | null | undefined,
    collection: RoutedCollectionSlug,
    locale: string | undefined,
    isPlural = false,
) => {
    const validatedLocale = isLocale(locale) ? locale : defaultLocale;
    const localePath = validatedLocale === defaultLocale ? ('' as const) : (`/${validatedLocale}` as const);
    const collectionPath = localizeCollection(collection, validatedLocale, isPlural);
    const slugPath = slug === '/' ? '' : (`/${slug}` as const);

    if (!slug) {
        return `${localePath}` as const;
    }

    return `${localePath}${collectionPath}${slugPath}` as const;
};

type FormatArchiveLinkProps = {
    locale?: string;
    slug?: string;
} & (
    | {
          route: RoutedCollectionSlug;
          type?: 'collection';
      }
    | {
          route: Path;
          type: 'path';
      }
);

export const formatArchiveLink = (props: FormatArchiveLinkProps) => {
    const { locale, slug } = props;
    const validatedLocale = isLocale(locale) ? locale : defaultLocale;

    const localePath = validatedLocale === defaultLocale ? ('' as const) : (`/${validatedLocale}` as const);
    const slugPath = slug === '/' || !slug ? '' : (`/${slug}` as const);

    const routePath =
        props.type === 'path'
            ? localizePath(props.route, validatedLocale)
            : localizeCollection(props.route, validatedLocale);

    const formatted = `${localePath}${routePath}${slugPath}` as const;
    return formatted;
};
