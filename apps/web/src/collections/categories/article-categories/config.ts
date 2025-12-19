import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import { slugField } from '@/components/molecules/admin/fields/slug';
import { Paragraph } from '@/components/organisms/blocks/paragraph/config';
import { contentMeta } from '@/lib/field-templates/content-meta';
import { payloadMeta } from '@/lib/field-templates/meta';
import { payloadPublishStatus } from '@/lib/field-templates/publish-state';
import { payloadTitleCollection } from '@/lib/field-templates/title';
import {
    createAfterChangeRevalidateHook,
    createAfterDeleteRevalidateHook,
} from '@/lib/payload-hooks/revalidate-content';
import type { Block, CollectionConfig } from 'payload';
import { authenticated } from '../../../access/authenticated';

const slug = 'article-categories';
const blocks: Block[] = [Paragraph];

export const ArticleCategories: CollectionConfig = {
    slug,
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'title',
        group: 'Categories',
    },
    fields: [
        ...payloadTitleCollection,
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Category Details',
                    fields: [
                        {
                            name: 'viewArticlesInCategory',
                            label: 'Articles in Category',
                            type: 'join',
                            collection: 'articles',
                            on: 'categories',
                        },
                    ],
                },
                {
                    label: 'Editorial',
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            localized: true,
                            blocks,
                            required: false,
                            admin: {
                                initCollapsed: false,
                            },
                        },
                    ],
                },
                payloadMeta,
            ],
        },

        payloadPublishStatus,
        ...slugField(),
        contentMeta(),
    ],
    hooks: {
        afterChange: [createAfterChangeRevalidateHook(slug)],
        afterDelete: [createAfterDeleteRevalidateHook(slug)],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 2500, // We set this interval for optimal live preview
            },
        },
        maxPerDoc: 50,
    },
};
