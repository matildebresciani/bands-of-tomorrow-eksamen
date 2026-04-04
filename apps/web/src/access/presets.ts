import { adminOrPublished } from '@/access/adminOrPublished';
import { authenticated } from '@/access/authenticated';
import { authenticatedAndAdmin } from '@/access/authenticatedAndAdmin';

export const adminOnlyCollectionAccess = {
    admin: authenticatedAndAdmin,
    create: authenticatedAndAdmin,
    delete: authenticatedAndAdmin,
    read: authenticatedAndAdmin,
    update: authenticatedAndAdmin,
};

export const adminOrPublishedCollectionAccess = {
    admin: authenticatedAndAdmin,
    create: authenticatedAndAdmin,
    delete: authenticatedAndAdmin,
    read: adminOrPublished,
    update: authenticatedAndAdmin,
};

export const adminManagedCollectionAccess = {
    admin: authenticated,
    create: authenticatedAndAdmin,
    delete: authenticatedAndAdmin,
    read: authenticatedAndAdmin,
    update: authenticatedAndAdmin,
};

export const adminOnlyGlobalAccess = {
    read: authenticatedAndAdmin,
    update: authenticatedAndAdmin,
};
