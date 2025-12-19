import type { Block } from 'payload';

export const VolunteerRoles: Block = {
    slug: 'volunteer-roles',
    interfaceName: 'VolunteerRoles',
    imageURL: '/images/block-thumbnails/volunteer-roles.png',
    labels: {
        singular: 'VolunteerRoles',
        plural: 'VolunteerRoles',
    },
    fields: [
        {
            type: 'text',
            name: 'heading',
            label: 'Heading',
        },
        {
            type: 'array',
            name: 'roles',
            label: 'Volunteer Roles',
            required: true,
            minRows: 1,
            fields: [
                {
                    type: 'upload',
                    name: 'roleThumbnail',
                    label: 'Thumbnail',
                    relationTo: 'media',
                },
                {
                    type: 'text',
                    name: 'volunteerRole',
                    label: 'Frivillig Rolle',
                },
                {
                    type: 'textarea',
                    name: 'roleDescription',
                    label: 'Rolle Beskrivelse',
                },
            ],
        },
    ],
};
