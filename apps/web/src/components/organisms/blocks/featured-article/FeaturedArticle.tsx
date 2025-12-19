import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import BannerSlider from '@/components/molecules/frontend/BannerSlider';
import { initPayload } from '@/lib/config';
import type { BC } from '@/lib/types/block-props';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import type { FeaturedArticle as FeaturedArticleProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const typeLabelMap: Record<string, string> = {
    'weekly-releases': 'Ugens Udgivelser',
    review: 'Anmeldelser',
    interview: 'Interviews',
};

const frontendRouteMap: Record<string, string> = {
    'weekly-releases': 'ugens-udgivelser',
    reviews: 'anmeldelser',
    interviews: 'interviews',
};

const FeaturedArticleBlock: BC<FeaturedArticleProps> = async ({ block, locale }) => {
    const { articleType, addBanner, bannerText } = block;

    const payload = await initPayload();
    const { docs } = await payload.find({
        collection: 'articles',
        where: {
            articleType: { equals: articleType },
        },
        sort: '-publishedAt',
        limit: 1,
    });

    const article = docs[0];
    const label = typeLabelMap[articleType];

    if (!article) {
        return (
            <BaseBlock>
                <p>Ingen artikel fundet i kategorien.</p>
            </BaseBlock>
        );
    }

    return (
        <BaseBlock classNameOuter="bg-bg-highlight py-xl relative overflow-hidden mb-section-xs md:mb-section-m">
            {addBanner && bannerText && <BannerSlider bannerText={bannerText} />}
            <div className="oakgrid">
                <div className="col-span-12 mb-10 lg:col-span-6 relative">
                    <div className="">
                        <div className="absolute top-0 left-0 w-[90%] h-auto aspect-[4/3] bg-bg-section-2" />
                    </div>

                    <div className="relative z-10 p-m">
                        <h3 className="text-fg-highlight uppercase">{label}</h3>
                    </div>

                    {article.contentMeta?.featuredImage && (
                        <div className="relative z-10 pl-[10%]">
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                <ImageMedia
                                    fill
                                    alt={article?.title || 'Article Image'}
                                    resource={article.contentMeta.featuredImage}
                                    imgClassName="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-12 lg:col-start-8 lg:col-span-5 space-y-m">
                    {article.publishedAt && (
                        <span className="text-fg-subtle block body-sm">
                            {formatDateTime(article.publishedAt, 'long')}
                        </span>
                    )}
                    <h3 className="text-fg-on-color uppercase">{article.title}</h3>
                    {article.contentMeta?.excerpt && <p className="text-fg-on-color">{article.contentMeta.excerpt}</p>}
                    <BaseButton
                        type="link"
                        href={`/${locale}/${frontendRouteMap[articleType]}/${article.slug}`}
                        title="Læs artikel"
                        variant="primaryOnColor"
                    />
                </div>
            </div>
        </BaseBlock>
    );
};

export default FeaturedArticleBlock;
