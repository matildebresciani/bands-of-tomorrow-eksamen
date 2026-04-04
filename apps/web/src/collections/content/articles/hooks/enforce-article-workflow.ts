import { hasAdminRole } from '@/access/hasUserRole';
import type { CollectionBeforeChangeHook } from 'payload';

export const enforceArticleWorkflow: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
    const isAdmin = hasAdminRole(req.user);
    const requestedPublishStatus = data.publishStatus ?? originalDoc?.publishStatus ?? 'draft';
    const publishStatus = !isAdmin && requestedPublishStatus === 'public' ? 'pendingApproval' : requestedPublishStatus;
    const isPublic = publishStatus === 'public';

    return {
        ...data,
        publishStatus,
        _status: isPublic ? 'published' : 'draft',
        publishedAt: isPublic ? data.publishedAt ?? originalDoc?.publishedAt ?? new Date() : null,
    };
};
