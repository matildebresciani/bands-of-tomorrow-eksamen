import type { CollectionConfig } from 'payload';

export const Redirects: CollectionConfig = {
    slug: 'redirects',
    labels: {
        singular: 'Redirect',
        plural: 'Redirects',
    },
    admin: {
        group: 'Tools & Settings',
        useAsTitle: 'redirectFrom',
        defaultColumns: ['redirectFrom', 'redirectTo', 'redirectType', 'active'],
    },
    fields: [
        {
            type: 'checkbox',
            label: 'Activate Redirect',
            name: 'active',
            defaultValue: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'redirectType',
                    type: 'select',
                    required: true,
                    admin: {
                        width: '20%',
                    },
                    options: [
                        {
                            label: 'Permanent Redirect (301)',
                            value: '301',
                        },
                        {
                            label: 'Temporary Redirect (302)',
                            value: '302',
                        },
                    ],
                    defaultValue: '301',
                },
                {
                    name: 'redirectFrom',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'Redirect from should be a relative path. (E.g. "/old-page")',
                    },
                },
                {
                    name: 'redirectTo',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'The redirect should be to a complete URL. (E.g. "https://www.oak.dk/new-page")',
                    },
                },
            ],
        },
    ],
};
