import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { slugField } from '@/components/molecules/admin/fields/slug';
import type { CollectionConfig } from 'payload';

export const Genres: CollectionConfig = {
    slug: 'genres',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'name',
        group: 'Categories',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            localized: true,
        },
        {
            name: 'viewArticlesInGenre',
            label: 'Articles in this Genre',
            type: 'join',
            collection: 'articles',
            on: 'genres',
        },
    ],
};
