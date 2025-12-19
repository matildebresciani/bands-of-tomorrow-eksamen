import {
    createAfterChangeRevalidateHook,
    createAfterDeleteRevalidateHook,
} from '@/lib/payload-hooks/revalidate-content';

const slug = 'articles';

export const revalidateArticle = createAfterChangeRevalidateHook(slug);
export const revalidateDelete = createAfterDeleteRevalidateHook(slug);
