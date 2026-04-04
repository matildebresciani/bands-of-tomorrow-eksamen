import { adminOrPublishedCollectionAccess } from '@/access/presets';
import { payloadPublishStatus, payloadPublishedAt } from '@/lib/field-templates/publish-state';
import type { CollectionConfig } from 'payload';

export const Faqs: CollectionConfig = {
    slug: 'faqs',
    access: adminOrPublishedCollectionAccess,
    labels: {
        singular: 'FAQ',
        plural: 'FAQs',
    },
    admin: {
        group: 'Entries',
        useAsTitle: 'question',
        defaultColumns: ['question', 'publishStatus'],
    },
    fields: [
        {
            type: 'text',
            label: 'Question',
            name: 'question',
            required: true,
        },
        {
            type: 'richText',
            label: 'Answer',
            name: 'answer',
        },
        payloadPublishedAt,
        payloadPublishStatus,
    ],
};
