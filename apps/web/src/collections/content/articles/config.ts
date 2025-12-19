import { ArticleAuthor } from '@/components/organisms/blocks/article-author/config';
import { ArticleHero } from '@/components/organisms/blocks/article-hero/config';
import { Form } from '@/components/organisms/blocks/form/config';
import { Gallery } from '@/components/organisms/blocks/gallery/config';
import { Paragraph } from '@/components/organisms/blocks/paragraph/config';
import { Playlist } from '@/components/organisms/blocks/playlist-block/config';
import { Quote } from '@/components/organisms/blocks/quote/config';
import { RelatedArticles } from '@/components/organisms/blocks/related-articles/config';
import { createRoutedCollection } from '@/lib/collection-templates/routed-collection';
import { payloadLivePreview } from '@/lib/field-templates/live-preview';
import { payloadSEO } from '@/lib/field-templates/seo';
import type { Block, CollectionConfig } from 'payload';
import { authenticated } from '../../../access/authenticated';
import { authenticatedOrPublished } from '../../../access/authenticatedOrPublished';
import { generatePreviewPath } from '../../../lib/utilities/generate-preview-path';

const blocks: Block[] = [Paragraph, ArticleAuthor, RelatedArticles, Playlist, Quote, ArticleHero, Gallery, Form];

export const Articles: CollectionConfig = createRoutedCollection('articles', {
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
        categories: true,
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
                        // --- CATEGORIES ---
                        // Usikkert på om vi skal bruge denne endnu, og til hvad
                        {
                            name: 'categories',
                            label: 'Kategorier',
                            type: 'relationship',
                            relationTo: 'article-categories',
                            hasMany: true,
                            admin: {
                                position: 'sidebar',
                            },
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
                            blocks,
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
});
