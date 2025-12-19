import { payloadRichText } from '@/lib/field-templates/rich-text';
import type { Block } from 'payload';

export const Quote: Block = {
    slug: 'quote',
    interfaceName: 'Quote',
    imageURL: '/images/block-thumbnails/quote.png',
    labels: {
        singular: 'Quote',
        plural: 'Quotes',
    },
    fields: [
        payloadRichText(),
        {
            name: 'showName',
            type: 'checkbox',
            label: 'Vis navn på quote',
        },
        {
            name: 'name',
            type: 'text',
            label: 'Navn',
            admin: {
                condition: (data, siblingData) => siblingData.showName === true,
            },
        },
    ],
};
