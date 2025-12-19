import { payloadHeading } from '@/lib/field-templates/headings';
import type { Block } from 'payload';

export const FAQ: Block = {
    slug: 'faq',
    interfaceName: 'FAQ',
    imageURL: '/images/block-thumbnails/faq.png',
    labels: {
        singular: 'FAQ',
        plural: 'FAQs',
    },
    fields: [
        payloadHeading(),
        {
            name: 'faqs',
            type: 'relationship',
            relationTo: 'faqs',
            hasMany: true,
        },
    ],
};
