import { authenticated } from '@/access/authenticated';
import { authenticatedAndAdmin } from '@/access/authenticatedAndAdmin';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import { createDraftOnlyEditorUpdateAccess } from '@/access/draftOnlyEditorUpdate';
import { createRoutedCollection } from '@/lib/collection-templates/routed-collection';
import { payloadLivePreview } from '@/lib/field-templates/live-preview';
import { payloadSEO } from '@/lib/field-templates/seo';
import { generatePreviewPath } from '@/lib/utilities/generate-preview-path';
import type { CollectionConfig } from 'payload';
import { enforceGalleryWorkflow } from './hooks/enforce-gallery-workflow';

export const Galleries: CollectionConfig = createRoutedCollection('galleries', {
    access: {
        admin: authenticated,
        create: authenticated,
        delete: authenticatedAndAdmin,
        read: authenticatedOrPublished,
        update: createDraftOnlyEditorUpdateAccess('galleries'),
    },
    admin: {
        group: 'Content',
        livePreview: payloadLivePreview('galleries'),
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'galleries',
                req,
            }),
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Galleri',
                    fields: [
                        {
                            name: 'photographer',
                            label: 'Fotograf',
                            type: 'relationship',
                            relationTo: 'volunteers',
                        },
                        {
                            name: 'galleryDate',
                            label: 'Dato',
                            type: 'date',
                            required: true,
                            admin: {
                                date: {
                                    pickerAppearance: 'dayOnly',
                                    displayFormat: 'd MMMM yyy',
                                },
                            },
                        },

                        {
                            type: 'text',
                            name: 'venue',
                            label: 'Spillested',
                        },
                        {
                            name: 'images',
                            label: 'Billeder',
                            type: 'upload',
                            relationTo: 'media',
                            hasMany: true,
                        },
                    ],
                },
                payloadSEO,
            ],
        },
    ],
    hooks: {
        beforeChange: [enforceGalleryWorkflow],
    },
});
