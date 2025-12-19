import { payloadHeading } from '@/lib/field-templates/headings';
import { payloadConditionalLinkCollection } from '@/lib/field-templates/links';
import type { Block } from 'payload';

export const ArticleSlider: Block = {
    slug: 'article-slider',
    interfaceName: 'ArticleSlider',
    imageURL: '/images/block-thumbnails/article-slider.png',
    labels: {
        singular: 'ArticleSlider',
        plural: 'ArticleSliders',
    },
    fields: [
        payloadHeading({ localized: false }),
        {
            type: 'select',
            name: 'cardType',
            label: 'Artikelkort type',
            options: [
                { label: 'Anmeldelser', value: 'review' },
                { label: 'Interviews', value: 'interview' },
            ],
            defaultValue: 'review',
        },
        ...payloadConditionalLinkCollection,
    ],
};
