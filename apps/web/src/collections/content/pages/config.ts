import { adminOrPublishedCollectionAccess } from '@/access/presets';
import { createRoutedCollection } from '@/lib/collection-templates/routed-collection';
import { pageLayoutBlocks } from '@/lib/content/layout-blocks';
import { payloadLivePreview } from '@/lib/field-templates/live-preview';
import { payloadMeta } from '@/lib/field-templates/meta';
import { populatePublishedAt } from '../../../lib/hooks/populate-published-at';
import { generatePreviewPath } from '../../../lib/utilities/generate-preview-path';
import { enforceHomepage } from './hooks/enforce-homepage';

export const Pages = createRoutedCollection('pages', {
    // This config controls what's populated by default when a page is referenced
    // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
    // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
    defaultPopulate: {
        title: true,
        slug: true,
    },
    access: adminOrPublishedCollectionAccess,
    admin: {
        defaultColumns: ['name', 'title', 'slug', 'updatedAt', 'publishStatus'],
        group: 'Content',
        livePreview: payloadLivePreview('pages'),
        preview: (data, { req, locale }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'pages',
                req,
                locale,
            }),
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            localized: true,
                            blocks: pageLayoutBlocks,
                            admin: {
                                initCollapsed: false,
                            },
                        },
                    ],
                    label: 'Content',
                },
                payloadMeta,
            ],
        },
    ],
    hooks: {
        beforeChange: [populatePublishedAt, enforceHomepage],
    },
});
