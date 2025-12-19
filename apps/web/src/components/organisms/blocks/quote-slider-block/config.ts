import type { Block } from 'payload';

export const QuoteSlider: Block = {
    slug: 'quote-slider',
    interfaceName: 'QuoteSlider',
    imageURL: '/images/block-thumbnails/quote-slider.png',
    labels: {
        singular: 'QuoteSlider',
        plural: 'QuoteSliders',
    },
    fields: [
        {
            type: 'relationship',
            name: 'quotes',
            label: 'Quotes',
            relationTo: 'quotes',
            hasMany: true,
            maxRows: 5,
            required: true,
        },
    ],
};
