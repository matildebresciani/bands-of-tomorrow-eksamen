import { payloadHeading } from '@/lib/field-templates/headings';
import type { Block } from 'payload';

export const HeadingBlock: Block = {
    slug: 'heading-block',
    interfaceName: 'HeadingBlock',
    imageURL: '/images/block-thumbnails/heading.png',
    labels: {
        singular: 'HeadingBlock',
        plural: 'HeadingBlocks',
    },
    fields: [
        {
            type: 'select',
            name: 'headingType',
            label: 'Type',
            options: [
                { label: 'H1', value: '1' },
                { label: 'H2', value: '2' },
            ],
            defaultValue: '1',
            required: true,
        },
        payloadHeading(),
    ],
};
