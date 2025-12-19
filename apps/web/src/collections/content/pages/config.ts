import { ArticleSlider } from '@/components/organisms/blocks/article-slider/config';
import { Divider } from '@/components/organisms/blocks/divider/config';
import { FAQ } from '@/components/organisms/blocks/faq/config';
import { FeaturedArticle } from '@/components/organisms/blocks/featured-article/config';
import { FeaturedConcerts } from '@/components/organisms/blocks/featured-concerts/config';
import { Form } from '@/components/organisms/blocks/form/config';
import { HeadingBlock } from '@/components/organisms/blocks/heading/config';
import { Hero } from '@/components/organisms/blocks/hero/config';
import { MainTeam } from '@/components/organisms/blocks/main-team/config';
import { Paragraph } from '@/components/organisms/blocks/paragraph/config';
import { QuoteSlider } from '@/components/organisms/blocks/quote-slider-block/config';
import { Quote } from '@/components/organisms/blocks/quote/config';
import { RecentArticles } from '@/components/organisms/blocks/recent-articles/config';
import { TextCard } from '@/components/organisms/blocks/text-card/config';
import { TextImage } from '@/components/organisms/blocks/text-image/config';
import { VolunteerRoles } from '@/components/organisms/blocks/volunteer-roles/config';
import { VolunteersTeam } from '@/components/organisms/blocks/volunteers-team/config';
import { createRoutedCollection } from '@/lib/collection-templates/routed-collection';
import { payloadLivePreview } from '@/lib/field-templates/live-preview';
import { payloadMeta } from '@/lib/field-templates/meta';
import type { Block } from 'payload';
import { populatePublishedAt } from '../../../lib/hooks/populate-published-at';
import { generatePreviewPath } from '../../../lib/utilities/generate-preview-path';
import { enforceHomepage } from './hooks/enforce-homepage';

const blocks: Block[] = [
    Hero,
    Paragraph,
    TextImage,
    ArticleSlider,
    RecentArticles,
    Divider,
    FeaturedArticle,
    VolunteerRoles,
    Form,
    QuoteSlider,
    HeadingBlock,
    FAQ,
    FeaturedConcerts,
    MainTeam,
    VolunteersTeam,
    TextCard,
];

export const Pages = createRoutedCollection('pages', {
    // This config controls what's populated by default when a page is referenced
    // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
    // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
    defaultPopulate: {
        title: true,
        slug: true,
    },
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
                            blocks,
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
