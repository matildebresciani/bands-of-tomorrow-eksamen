import { adminManagedCollectionAccess } from '@/access/presets';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
    slug: 'users',
    access: adminManagedCollectionAccess,
    admin: {
        defaultColumns: ['name', 'email'],
        useAsTitle: 'name',
        group: 'Tools & Settings',
    },
    auth: true,
    fields: [
        {
            name: 'name',
            type: 'text',
        },
        {
            type: 'select',
            name: 'userRole',
            label: 'User Role',
            defaultValue: 'admin',
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'Editor',
                    value: 'editor',
                },
            ],
        },
    ],
    timestamps: true,
};
