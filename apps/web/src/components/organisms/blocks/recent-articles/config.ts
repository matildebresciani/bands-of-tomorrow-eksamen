import { payloadHeading } from '@/lib/field-templates/headings';
import type { Block } from 'payload';

export const RecentArticles: Block = {
    slug: 'recent-articles',
    interfaceName: 'RecentArticles',
    imageURL: '/images/block-thumbnails/recent-articles.png',
    labels: {
        singular: 'RecentArticles',
        plural: 'RecentArticles',
    },
    fields: [payloadHeading()],
};
