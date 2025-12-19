import { slugField } from '@/components/molecules/admin/fields/slug';
import type { CollectionConfig, CollectionSlug } from 'payload';
import { contentMeta } from '../field-templates/content-meta';
import { payloadPublishStatus, payloadPublishedAt } from '../field-templates/publish-state';
import { payloadTitleCollection } from '../field-templates/title';
import { createCollection } from './collection';

export const createRoutedCollection = <Slug extends CollectionSlug>(
    slug: Slug,
    config: Omit<CollectionConfig<Slug>, 'slug'>,
): CollectionConfig<Slug> => {
    return createCollection(slug, {
        ...config,
        admin: {
            ...config.admin,
            useAsTitle: 'name',
        },
        fields: [
            ...payloadTitleCollection,
            ...config.fields,
            payloadPublishedAt,
            payloadPublishStatus,
            ...slugField(),
            contentMeta(),
        ],
        versions: {
            drafts: {
                autosave: {
                    interval: 2500, // We set this interval for optimal live preview
                },
            },
            maxPerDoc: 50,
        },
    });
};
