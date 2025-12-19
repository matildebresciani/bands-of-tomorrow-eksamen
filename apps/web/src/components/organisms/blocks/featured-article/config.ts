import type { Block } from 'payload';

export const FeaturedArticle: Block = {
    slug: 'featured-article',
    interfaceName: 'FeaturedArticle',
    imageURL: '/images/block-thumbnails/featured-article.png',
    labels: {
        singular: 'FeaturedArticle',
        plural: 'FeaturedArticles',
    },
    fields: [
        {
            type: 'select',
            name: 'articleType',
            label: 'Artikel Type',
            options: [
                { label: 'Ugens Udgivelser', value: 'weekly-releases' },
                { label: 'Anmeldelser', value: 'review' },
                { label: 'Interviews', value: 'interview' },
            ],
            required: true,
            defaultValue: 'weekly-releases',
        },
        {
            type: 'checkbox',
            name: 'addBanner',
            label: 'Tilføj banner',
        },
        {
            type: 'text',
            name: 'bannerText',
            label: 'Banner tekst',
            admin: {
                condition: (data, siblingData) => siblingData?.addBanner === true,
            },
            defaultValue: 'NEW!',
        },
        // payloadLink(),
    ],
};
