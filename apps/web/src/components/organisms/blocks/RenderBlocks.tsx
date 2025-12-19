import type { Locale, RoutedCollectionSlug } from '@/i18n/localized-collections';
import type { Article, Page } from '@/payload-types';
import type React from 'react';
import { Fragment } from 'react';
import ArticleAuthorBlock from './article-author/ArticleAuthor';
import ArticleHeroBlock from './article-hero/ArticleHero';
import ArticleSliderBlock from './article-slider/ArticleSlider';
import DividerBlock from './divider/Divider';
import FaqBlock from './faq/Faq';
import FeaturedArticleBlock from './featured-article/FeaturedArticle';
import FeaturedConcertsBlock from './featured-concerts/FeaturedConcerts';
import FormBlock from './form/Form';
import GalleryBlock from './gallery/Gallery';
import HeadingBlock from './heading/HeadingBlock';
import HeroBlock from './hero/Hero';
import MainTeamBlock from './main-team/MainTeam';
import ParagraphBlock from './paragraph/Paragraph';
import PlaylistBlock from './playlist-block/PlaylistBlock';
import QuoteSliderBlock from './quote-slider-block/QuoteSlider';
import QuoteBlock from './quote/QuoteBlock';
import RecentArticlesBlock from './recent-articles/RecentArticles';
import RelatedArticlesBlock from './related-articles/RelatedArticles';
import TextCardBlock from './text-card/TextCard';
import TextImageBlock from './text-image/TextImage';
import VolunteerRolesBlock from './volunteer-roles/VolunteerRoles';
import VolunteersTeamBlock from './volunteers-team/VolunteersTeam';

const blockComponents = {
    hero: HeroBlock,
    paragraph: ParagraphBlock,
    'text-image': TextImageBlock,
    quote: QuoteBlock,
    divider: DividerBlock,
    'article-slider': ArticleSliderBlock,
    'recent-articles': RecentArticlesBlock,
    'article-author': ArticleAuthorBlock,
    'related-articles': RelatedArticlesBlock,
    playlist: PlaylistBlock,
    'quote-slider': QuoteSliderBlock,
    'article-hero': ArticleHeroBlock,
    'featured-article': FeaturedArticleBlock,
    gallery: GalleryBlock,
    'volunteer-roles': VolunteerRolesBlock,
    form: FormBlock,
    'heading-block': HeadingBlock,
    faq: FaqBlock,
    'main-team': MainTeamBlock,
    'volunteers-team': VolunteersTeamBlock,
    'featured-concerts': FeaturedConcertsBlock,
    'text-card': TextCardBlock,
};

export const RenderBlocks: React.FC<{
    pageId: string;
    blocks: NonNullable<Page['layout'] | Article['layout']>[0][];
    locale?: Locale;
    collectionType?: RoutedCollectionSlug;
}> = (props) => {
    const { pageId, blocks, locale, collectionType } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block;

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType];

                        if (Block) {
                            return (
                                <Block
                                    // biome-ignore lint/suspicious/noArrayIndexKey: This should be fine for render blocks as they do not really change while in use
                                    key={index}
                                    pageId={pageId}
                                    // @ts-expect-error
                                    block={block}
                                    locale={locale}
                                    collectionType={collectionType}
                                />
                            );
                        }
                    }
                    console.warn(`Block type "${blockType}" not found in blockComponents`);
                    return null;
                })}
            </Fragment>
        );
    }

    return null;
};
