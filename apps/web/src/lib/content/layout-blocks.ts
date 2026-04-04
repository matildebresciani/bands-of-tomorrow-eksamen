import { ArticleAuthor } from '@/components/organisms/blocks/article-author/config';
import { ArticleHero } from '@/components/organisms/blocks/article-hero/config';
import { ArticleSlider } from '@/components/organisms/blocks/article-slider/config';
import { Divider } from '@/components/organisms/blocks/divider/config';
import { FAQ } from '@/components/organisms/blocks/faq/config';
import { FeaturedArticle } from '@/components/organisms/blocks/featured-article/config';
import { FeaturedConcerts } from '@/components/organisms/blocks/featured-concerts/config';
import { Form } from '@/components/organisms/blocks/form/config';
import { GallerySlider } from '@/components/organisms/blocks/gallery-slider/config';
import { Gallery } from '@/components/organisms/blocks/gallery/config';
import { HeadingBlock } from '@/components/organisms/blocks/heading/config';
import { Hero } from '@/components/organisms/blocks/hero/config';
import { MainTeam } from '@/components/organisms/blocks/main-team/config';
import { Paragraph } from '@/components/organisms/blocks/paragraph/config';
import { Playlist } from '@/components/organisms/blocks/playlist-block/config';
import { QuoteSlider } from '@/components/organisms/blocks/quote-slider-block/config';
import { Quote } from '@/components/organisms/blocks/quote/config';
import { RecentArticles } from '@/components/organisms/blocks/recent-articles/config';
import { RelatedArticles } from '@/components/organisms/blocks/related-articles/config';
import { SavedLayoutsBlockConfig } from '@/components/organisms/blocks/saved-layouts/config';
import { TextCard } from '@/components/organisms/blocks/text-card/config';
import { TextImage } from '@/components/organisms/blocks/text-image/config';
import { VolunteerRoles } from '@/components/organisms/blocks/volunteer-roles/config';
import { VolunteersTeam } from '@/components/organisms/blocks/volunteers-team/config';
import type { Block } from 'payload';

export const pageLayoutBlocks: Block[] = [
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
    GallerySlider,
    SavedLayoutsBlockConfig,
];

export const articleLayoutBlocks: Block[] = [
    Paragraph,
    ArticleAuthor,
    RelatedArticles,
    Playlist,
    Quote,
    ArticleHero,
    Gallery,
    Form,
    SavedLayoutsBlockConfig,
];

const sharedBlocks = [...pageLayoutBlocks, ...articleLayoutBlocks];

export const savedLayoutBlocks = sharedBlocks.filter(
    (block, index, blocks) =>
        block.slug !== SavedLayoutsBlockConfig.slug && blocks.findIndex((candidate) => candidate.slug === block.slug) === index,
);
