import { payloadLinkInner } from '@/lib/field-templates/links';
import type { Block } from 'payload';

export const VolunteersTeam: Block = {
    slug: 'volunteers-team',
    interfaceName: 'VolunteersTeam',
    imageURL: '/images/block-thumbnails/volunteers-list.png',
    labels: {
        singular: 'VolunteersTeam',
        plural: 'VolunteersTeams',
    },
    fields: [
        {
            type: 'relationship',
            name: 'volunteersTeam',
            label: 'Frivillige',
            relationTo: 'volunteers',
            hasMany: true,
            required: true,
            minRows: 1,
        },
        {
            type: 'checkbox',
            name: 'addLink',
            label: 'Add CTA',
        },
        {
            type: 'text',
            name: 'footerText',
            label: 'CTA Description',
            admin: {
                condition: (_, siblingData) => siblingData?.addLink === true,
            },
        },
        {
            type: 'collapsible',
            label: 'Link',
            admin: {
                condition: (_, siblingData) => siblingData?.addLink === true,
            },
            fields: [payloadLinkInner()],
        },
    ],
};
