import { payloadHeading } from '@/lib/field-templates/headings';
import { payloadConditionalLinkCollection } from '@/lib/field-templates/links';
import type { Block } from 'payload';

export const FeaturedConcerts: Block = {
    slug: 'featured-concerts',
    interfaceName: 'FeaturedConcerts',
    imageURL: '/images/block-thumbnails/featured-concerts.png',
    labels: {
        singular: 'FeaturedConcerts',
        plural: 'FeaturedConcertss',
    },
    fields: [payloadHeading(), ...payloadConditionalLinkCollection],
};
