import type { Article } from '@/payload-types';

export function formatArticleLabel(article: Article): string {
    switch (article.articleType) {
        case 'review':
            if (article.reviewType === 'concert') return 'Koncert';
            if (article.reviewType === 'album') return 'Album';
            return 'Anmeldelse';
        case 'interview':
            return 'Interview';
        case 'weekly-releases':
            return 'Ugens udgivelser';
        default:
            return '';
    }
}
