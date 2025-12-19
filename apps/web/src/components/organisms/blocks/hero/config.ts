import type { Block } from 'payload';

export const Hero: Block = {
    slug: 'hero',
    interfaceName: 'Hero',
    imageURL: '/images/block-thumbnails/hero.png',
    labels: {
        singular: 'Hero',
        plural: 'Heros',
    },
    fields: [
        {
            type: 'relationship',
            name: 'featuredArticles',
            label: 'Featured Articles',
            relationTo: 'articles',
            hasMany: true,
            maxRows: 5,
            admin: {
                description: 'Select up to 5 articles to feature in the hero block.',
            },
        },
    ],
};
