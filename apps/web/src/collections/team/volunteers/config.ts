import { anyone } from '@/access/anyone';
import { createCollection } from '@/lib/collection-templates/collection';

export const Volunteers = createCollection('volunteers', {
    admin: {
        useAsTitle: 'volunteerName',
        group: 'Team',
    },
    access: {
        read: anyone,
    },
    fields: [
        // --- NAME FIELDS (ROW) ---
        {
            name: 'volunteerName',
            label: 'Navn',
            type: 'text',
            required: true,
            admin: {
                width: '50%',
            },
        },
        {
            name: 'displayName',
            label: 'Visningsnavn (optional)',
            type: 'text',
            required: false,
            admin: {
                width: '50%',
            },
        },

        // --- ROLE GROUP (ROW) ---
        {
            type: 'select',
            name: 'roleGroup',
            label: 'Type frivillig',
            required: true,
            options: [
                { label: 'Kernefrivillig', value: 'core' },
                { label: 'Frivillig', value: 'regular' },
            ],
            defaultValue: 'regular',
            admin: {
                width: '50%',
            },
        },
        {
            type: 'select',
            name: 'volunteerRole',
            label: 'Rolle',
            required: true,
            options: [
                { label: 'Skribent', value: 'writer' },
                { label: 'Fotograf', value: 'photographer' },
                { label: 'SoMe Frivillig', value: 'social' },
                { label: 'Andet', value: 'other' },
            ],
            defaultValue: 'writer',
            admin: {
                width: '50%',
            },
        },

        // --- CUSTOM ROLE ---
        {
            name: 'customRole',
            label: 'Custom rolle',
            type: 'text',
            required: false,
            admin: {
                width: '100%',
                condition: (_, siblingData) => siblingData.volunteerRole === 'other',
            },
        },

        // --- CONTACT DETAILS (ROW) ---
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            required: false,
            admin: {
                width: '50%',
            },
        },
        // --- PROFILE PICTURE ---
        {
            type: 'upload',
            name: 'profilePicture',
            relationTo: 'media',
            label: 'Profilbillede',
            required: false,
        },
    ],
});
