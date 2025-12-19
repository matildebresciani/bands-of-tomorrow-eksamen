import type { Block } from 'payload';

export const ArticleAuthor: Block = {
    slug: 'article-author',
    interfaceName: 'ArticleAuthor',
    imageURL: '/images/block-thumbnails/author-card.png',
    labels: {
        singular: 'ArticleAuthor',
        plural: 'ArticleAuthors',
    },
    fields: [
        {
            type: 'relationship',
            name: 'author',
            label: 'Author',
            relationTo: 'volunteers',
        },
    ],
};
