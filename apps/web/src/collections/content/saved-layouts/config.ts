import { anyone } from '@/access/anyone';
import { createCollection } from '@/lib/collection-templates/collection';
import { savedLayoutBlocks } from '@/lib/content/layout-blocks';

const slug = 'saved-layouts';

export const SavedLayoutsCollection = createCollection(slug, {
    access: {
        read: anyone,
    },
    admin: {
        group: 'Content',
        useAsTitle: 'title',
        defaultColumns: ['title', 'updatedAt'],
    },
    labels: {
        singular: 'Saved Layout',
        plural: 'Saved Layouts',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'layout',
            type: 'blocks',
            localized: true,
            blocks: savedLayoutBlocks,
            admin: {
                initCollapsed: false,
            },
        },
    ],
});
