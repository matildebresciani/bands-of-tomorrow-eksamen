import { hasAdminRole, hasEditorRole } from '@/access/hasUserRole';
import type { Access, CollectionSlug } from 'payload';

type CollectionWithPublishStatus = 'articles' | 'galleries';

export const createDraftOnlyEditorUpdateAccess = (collection: CollectionWithPublishStatus): Access => {
    return async ({ req, id }) => {
        const { user, payload } = req;

        if (!user) return false;
        if (hasAdminRole(user)) return true;
        if (!hasEditorRole(user)) return false;
        if (!id) return false;

        const entry = (await payload.findByID({
            collection: collection as CollectionSlug,
            id,
            depth: 0,
            overrideAccess: true,
        })) as { publishStatus?: string };

        return entry.publishStatus === 'draft';
    };
};
