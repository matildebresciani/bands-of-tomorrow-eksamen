import { anyone } from '@/access/anyone';
import { createCollection } from '@/lib/collection-templates/collection';

export const Concerts = createCollection('concerts', {
    admin: {
        useAsTitle: 'artist',
        defaultColumns: ['artist', 'date', 'venue', 'city'],
        group: 'Content',
    },
    access: {
        read: anyone,
    },
    fields: [
        // --- FEATURED IMAGE ---
        {
            type: 'upload',
            name: 'featuredImage',
            relationTo: 'media',
            label: 'Featured Image',
            required: true,
        },

        // --- ARTIST + SUPPORT ---
        {
            type: 'row',
            fields: [
                {
                    name: 'artist',
                    label: 'Kunstner',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'support',
                    label: 'Support Act (valgfrit)',
                    type: 'text',
                    required: false,
                },
            ],
        },

        // --- VENUE / CITY ---
        {
            type: 'row',
            fields: [
                {
                    name: 'venue',
                    label: 'Spillested',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'city',
                    label: 'By',
                    type: 'text',
                    required: true,
                },
            ],
        },
        // --- DATE ---
        {
            name: 'date',
            label: 'Dato',
            type: 'date',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'd MMMM yyy',
                },
            },
        },

        // --- LINK ---
        {
            name: 'ticketLink',
            label: 'Link til koncertside',
            type: 'text',
            required: false,
            admin: {
                width: '100%',
            },
        },
    ],
});
