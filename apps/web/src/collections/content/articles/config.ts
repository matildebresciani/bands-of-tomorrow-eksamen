import { createDraftOnlyEditorUpdateAccess } from '@/access/draftOnlyEditorUpdate';
import { createRoutedCollection } from '@/lib/collection-templates/routed-collection';
import { articleLayoutBlocks } from '@/lib/content/layout-blocks';
import { payloadLivePreview } from '@/lib/field-templates/live-preview';
import { payloadSEO } from '@/lib/field-templates/seo';
import type { CollectionConfig } from 'payload';
import { authenticated } from '../../../access/authenticated';
import { authenticatedAndAdmin } from '../../../access/authenticatedAndAdmin';
import { authenticatedOrPublished } from '../../../access/authenticatedOrPublished';
import { generatePreviewPath } from '../../../lib/utilities/generate-preview-path';
import { enforceArticleWorkflow } from './hooks/enforce-article-workflow';

export const Articles: CollectionConfig = createRoutedCollection('articles', {
    access: {
        admin: authenticated,
        create: authenticated,
        delete: authenticatedAndAdmin,
        read: authenticatedOrPublished,
        update: createDraftOnlyEditorUpdateAccess('articles'),
    },
    defaultPopulate: {
        title: true,
        slug: true,
        articleType: true,
    },
    admin: {
        defaultColumns: ['name', 'title', 'slug', 'publishedAt', 'updatedAt', 'publishStatus'],
        group: 'Content',
        livePreview: payloadLivePreview('articles'),
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'articles',
                req,
                articleType:
                    typeof data?.articleType === 'string' &&
                    ['review', 'interview', 'weekly-releases'].includes(data.articleType as string)
                        ? (data.articleType as 'review' | 'interview' | 'weekly-releases')
                        : undefined,
            }),
    },
    fields: [
        {
            type: 'group',
            label: 'Article Details',
            fields: [
                {
                    type: 'collapsible',
                    label: 'Article Details',
                    fields: [
                        // --- ARTICLE TYPE ---
                        {
                            name: 'articleType',
                            label: 'Artiklens type',
                            type: 'select',
                            required: true,
                            options: [
                                { label: 'Anmeldelse', value: 'review' },
                                { label: 'Interview', value: 'interview' },
                                { label: 'Ugens udgivelser', value: 'weekly-releases' },
                            ],
                            defaultValue: 'review',
                        },
                        // --- REVIEW TYPE (only if review) ---
                        {
                            name: 'reviewType',
                            label: 'Anmeldelsestype',
                            type: 'select',
                            options: [
                                { label: 'Koncertanmeldelse', value: 'concert' },
                                { label: 'Albumanmeldelse', value: 'album' },
                            ],
                            admin: {
                                condition: (_, siblingData) => siblingData.articleType === 'review',
                            },
                        },
                        // --- GENRE ---
                        {
                            name: 'genres',
                            label: 'Genre',
                            type: 'relationship',
                            hasMany: true,
                            relationTo: 'genres',
                            admin: {
                                position: 'sidebar',
                            },
                        },
                        // --- ARTIST NAME ---
                        {
                            type: 'text',
                            name: 'artistName',
                            label: 'Artist Navn',
                        },
                    ],
                },
                {
                    name: 'relatedArticles',
                    label: 'Relaterede artikler',
                    type: 'relationship',
                    admin: {
                        position: 'sidebar',
                    },
                    filterOptions: ({ id }) => {
                        return {
                            id: {
                                not_in: [id],
                            },
                        };
                    },
                    hasMany: true,
                    relationTo: 'articles',
                },
            ],
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            localized: true,
                            blocks: articleLayoutBlocks,
                            admin: {
                                initCollapsed: false,
                            },
                            defaultValue: () => [
                                {
                                    blockType: 'article-hero',
                                    // heading: 'Hero',
                                },
                                {
                                    blockType: 'article-author',
                                    // heading: 'Skribent',
                                },
                                //TODO: Spotify felt kun for ugens udgivelser
                                //TODO: Formular block kun for ugens udgivelser
                                {
                                    blockType: 'related-articles',
                                    heading: 'Relaterede artikler',
                                },
                            ],
                        },
                    ],
                    label: 'Content',
                },
                payloadSEO,
            ],
        },
    ],
    hooks: {
        beforeChange: [enforceArticleWorkflow],
    },
});
