import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
import { Heading } from '@/components/atoms/frontend/heading/Heading';
import CardSlider from '@/components/molecules/frontend/CardSlider';
import { getCachedCollection } from '@/lib/data/payload/get-cached-collection';
import type { BC } from '@/lib/types/block-props';
import type { ArticleSlider as ArticleSliderProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const ArticleSliderBlock: BC<ArticleSliderProps> = async ({ block }) => {
    const { heading, addLink, link, cardType } = block;

    const articleType = cardType === 'review' ? 'review' : cardType === 'interview' ? 'interview' : null;

    const articlesRes = await getCachedCollection({
        collection: 'articles',
        sort: '-publishedAt',
        whereFields: {
            articleType: { equals: articleType },
        },
        limit: 10,
    });

    const articles = articlesRes.docs;

    return (
        <BaseBlock classNameOuter="overflow-hidden">
            <div className="oakgrid">
                <div className="col-span-12">
                    <Heading level={2} className="mb-section-xxs">
                        {heading}
                    </Heading>
                    <div className="relative max-w-full">
                        <CardSlider articles={articles} />
                    </div>
                    {addLink && link && (
                        <div className="mt-l flex justify-center">
                            <DynamicButton variant="tertiary" link={link} />
                        </div>
                    )}
                </div>
            </div>
        </BaseBlock>
    );
};

export default ArticleSliderBlock;
