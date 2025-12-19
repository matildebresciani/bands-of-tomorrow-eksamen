import type { Article } from '@/payload-types';

export function getArticleUrl(article: Article) {
    const type = resolveArticleType(article.articleType);

    switch (type) {
        case 'review':
            return `/anmeldelser/${article.slug}`;
        case 'interview':
            return `/interviews/${article.slug}`;
        case 'weekly-releases':
            return `/ugens-udgivelser/${article.slug}`;
        default:
            return `/artikel/${article.slug}`;
    }
}

type ArticleTypeRelation = string | { slug: string } | { id: string } | null | undefined;

function resolveArticleType(value: ArticleTypeRelation): string | undefined {
    if (!value) return undefined;

    if (typeof value === 'string') return value;

    if ('slug' in value) return value.slug;
    if ('id' in value) return value.id;

    return undefined;
}
