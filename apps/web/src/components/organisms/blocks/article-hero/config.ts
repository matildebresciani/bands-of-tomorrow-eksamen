import type { Block } from 'payload';

export const ArticleHero: Block = {
    slug: 'article-hero',
    interfaceName: 'ArticleHero',
    imageURL: '/images/block-thumbnails/article-hero.png',
    labels: {
        singular: 'ArticleHero',
        plural: 'ArticleHeros',
    },
    fields: [
        {
            type: 'radio',
            name: 'order',
            label: 'Order',
            required: true,
            defaultValue: 'image-full-width',
            options: [
                {
                    label: 'Image Full Width',
                    value: 'image-full-width',
                },
                {
                    label: 'Image Split',
                    value: 'image-split',
                },
            ],
        },
        {
            name: 'imageCaption',
            type: 'text',
            label: 'Billedbeskrivelse',
        },
        {
            type: 'relationship',
            name: 'author',
            label: 'Author',
            relationTo: 'volunteers',
        },
    ],
};
