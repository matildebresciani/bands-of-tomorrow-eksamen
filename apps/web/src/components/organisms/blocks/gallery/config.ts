import type { Block } from 'payload';

export const Gallery: Block = {
    slug: 'gallery',
    interfaceName: 'Gallery',
    imageURL: '/images/block-thumbnails/gallery.png',
    labels: {
        singular: 'Gallery',
        plural: 'Galleries',
    },

    fields: [
        //
        // 1. Layout
        //
        {
            name: 'layout',
            type: 'select',
            required: true,
            label: 'Layout',
            options: [
                { label: '1 Billede', value: 'fullWidth' },
                { label: '2 Billeder', value: 'twoColumn' },
                { label: '3 Mosaic', value: 'mosaic3' },
                { label: '3: 1 øverst + 2 under', value: 'bigTopTwoUnder' },
                { label: '3 på række', value: 'threeColumn' },
                { label: '4: 3 øverst + 1 under', value: 'threeTopOneUnder' },
            ],
        },

        //
        // 2. FIELDS FOR EACH SLOT (conditionally visible)
        //

        // fullWidth
        {
            name: 'slot_fullWidth',
            label: 'Billede',
            type: 'upload',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'fullWidth',
            },
        },

        // twoColumn
        {
            name: 'slot_left',
            label: 'Venstre billede',
            type: 'upload',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'twoColumn',
            },
        },
        {
            name: 'slot_right',
            label: 'Højre billede',
            type: 'upload',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'twoColumn',
            },
        },

        // mosaic3
        {
            name: 'slot_big',
            type: 'upload',
            label: 'Stort billede',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'mosaic3',
            },
        },
        {
            name: 'slot_wideTop',
            type: 'upload',
            label: 'Wide (top)',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'mosaic3',
            },
        },
        {
            name: 'slot_wideBottom',
            type: 'upload',
            label: 'Wide (bottom)',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'mosaic3',
            },
        },

        // bigTopTwoUnder
        {
            name: 'slot_top',
            type: 'upload',
            label: 'Øverst',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'bigTopTwoUnder',
            },
        },
        {
            name: 'slot_bottomLeft',
            type: 'upload',
            label: 'Nederst (venstre)',
            relationTo: 'media',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'bigTopTwoUnder',
            },
        },
        {
            name: 'slot_bottomRight',
            type: 'upload',
            relationTo: 'media',
            label: 'Nederst (højre)',
            admin: {
                condition: (data, siblingData) => siblingData.layout === 'bigTopTwoUnder',
            },
        },

        // threeColumn
        {
            name: 'slot_a',
            type: 'upload',
            relationTo: 'media',
            admin: { condition: (data, siblingData) => siblingData.layout === 'threeColumn' },
        },
        {
            name: 'slot_b',
            type: 'upload',
            relationTo: 'media',
            admin: { condition: (data, siblingData) => siblingData.layout === 'threeColumn' },
        },
        {
            name: 'slot_c',
            type: 'upload',
            relationTo: 'media',
            admin: { condition: (data, siblingData) => siblingData.layout === 'threeColumn' },
        },

        // threeTopOneUnder
        {
            name: 'slot_topLeft',
            type: 'upload',
            relationTo: 'media',
            admin: { condition: (data, siblingData) => siblingData.layout === 'threeTopOneUnder' },
        },
        {
            name: 'slot_topCenter',
            type: 'upload',
            relationTo: 'media',
            admin: { condition: (data, siblingData) => siblingData.layout === 'threeTopOneUnder' },
        },
        {
            name: 'slot_topRight',
            type: 'upload',
            relationTo: 'media',
            admin: { condition: (data, siblingData) => siblingData.layout === 'threeTopOneUnder' },
        },
        {
            name: 'slot_bottom',
            type: 'upload',
            relationTo: 'media',
            admin: { condition: (data, siblingData) => siblingData.layout === 'threeTopOneUnder' },
        },
        {
            type: 'text',
            name: 'galleryDescription',
            label: 'Description',
        },
    ],
};
