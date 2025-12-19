import CardLabel from '@/components/atoms/frontend/labels/CardLabel';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import RichText from '@/components/molecules/admin/RichText';
import { getCachedEntryById } from '@/lib/data/payload/get-cached-entry-by-id';
import type { BC } from '@/lib/types/block-props';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import { formatArticleLabel } from '@/lib/utilities/format-label';
import { cn } from '@/lib/utilities/ui';
import type { ArticleHero as ArticleHeroProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const ArticleHeroBlock: BC<ArticleHeroProps> = async ({ block, locale, pageId }) => {
    const { order, author, imageCaption } = block;

    const articleData = await getCachedEntryById({
        collection: 'articles',
        id: pageId,
        locale,
    });

    const image =
        articleData?.contentMeta?.featuredImage && typeof articleData.contentMeta.featuredImage === 'object'
            ? articleData.contentMeta.featuredImage
            : null;

    const altText =
        (image?.alt && typeof image.alt === 'string'
            ? image.alt
            : typeof image?.alt === 'object'
              ? image?.alt
              : null) ||
        articleData?.title ||
        'Article Image';

    return (
        <BaseBlock classNameOuter="!pb-section-xxs">
            <div className="oakgrid gap-0">
                <figure
                    className={cn(
                        'col-span-12 relative overflow-hidden w-full border border-border-base',
                        order === 'image-split' &&
                            'lg:col-span-6 lg:col-start-1 min-h-[380px] h-full lg:border-r-0 border-b-0 md:border-b',
                        order === 'image-full-width' && 'min-h-[400px] border-b-0',
                    )}
                >
                    {image && (
                        <ImageMedia fill alt={altText} resource={image} imgClassName="object-cover w-full h-full" />
                    )}
                    <div className="absolute top-4 left-4 z-10">
                        {articleData?.articleType && (
                            <CardLabel
                                label={formatArticleLabel(articleData)}
                                type={articleData.articleType}
                                reviewType={articleData.reviewType}
                            />
                        )}
                    </div>

                    {imageCaption && (
                        <figcaption className="absolute bottom-4 left-4 text-fg-on-color text-sm italic z-10 w-full">
                            {imageCaption}
                        </figcaption>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </figure>
                <div
                    className={cn(
                        'col-span-12',
                        order === 'image-split' && 'lg:col-span-6 lg:col-start-7 flex h-[100%]',
                    )}
                >
                    <div className="border border-border-base space-y-s p-m">
                        <div className="flex flex-col md:flex-row gap-1 md:gap-m body-md">
                            {articleData?.publishedAt && <span>{formatDateTime(articleData.publishedAt, 'long')}</span>}
                            {articleData?.publishedAt && author && <span className="hidden md:block"> | </span>}
                            {author && (
                                <span>
                                    Af{' '}
                                    <span className="italic">
                                        {typeof author === 'string' ? author : author.volunteerName}
                                    </span>
                                </span>
                            )}
                        </div>
                        <h1 className="heading-lg">{articleData?.title}</h1>
                        <p className="italic">{articleData?.contentMeta?.excerpt}</p>
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default ArticleHeroBlock;
