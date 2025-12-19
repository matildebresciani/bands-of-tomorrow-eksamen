import { payloadRichText } from '@/lib/field-templates/rich-text';
import type { Block } from 'payload';

export const TextCard: Block = {
    slug: 'text-card',
    interfaceName: 'TextCard',
    imageURL: '/images/block-thumbnails/text-card.png',
    labels: {
        singular: 'TextCard',
        plural: 'TextCards',
    },
    fields: [
        {
            type: 'checkbox',
            name: 'addBgColor',
            label: 'Add Background Color',
            defaultValue: true,
        },
        payloadRichText(),
        {
            type: 'relationship',
            name: 'volunteer',
            label: 'Frivillig',
            relationTo: 'volunteers',
        },
    ],
};
