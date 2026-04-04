import { adminOnlyCollectionAccess } from '@/access/presets';
import type { CollectionConfig } from 'payload';

export const ApiKeys: CollectionConfig = {
    slug: 'apiKeys',
    access: adminOnlyCollectionAccess,
    labels: {
        singular: 'API Key',
        plural: 'API Keys',
    },
    admin: {
        group: 'Tools & Settings',
        useAsTitle: 'title',
    },
    auth: {
        useAPIKey: true,
        disableLocalStrategy: true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
    ],
};
