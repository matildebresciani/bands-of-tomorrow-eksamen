import { Heading } from '@/components/atoms/frontend/heading/Heading';
import ArticleCard from '@/components/molecules/frontend/article-cards/ArticleCard';
import { initPayload } from '@/lib/config';
import type { BC } from '@/lib/types/block-props';
import type { RecentArticles as RecentArticlesProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const RecentArticlesBlock: BC<RecentArticlesProps> = async ({ block }) => {
    const { heading } = block;

    const payload = await initPayload();
    const { docs: articles } = await payload.find({
        collection: 'articles',
        sort: '-publishedAt',
        limit: 5,
    });

    return (
        <BaseBlock>
            <div className="oakgrid gap-0">
                {heading && (
                    //TODO: Mobile spacing margin bottom too big
                    <Heading level={2} className="col-span-12 text-center mb-section-xxs">
                        {heading}
                    </Heading>
                )}
                <div className="col-span-12 lg:col-span-7 h-full">
                    {articles[0] && <ArticleCard variant="latest-big" article={articles[0]} />}
                </div>
                <div className="col-span-12 lg:col-span-5 grid grid-cols-1 auto-rows-fr h-full">
                    {articles.slice(1).map((article) => (
                        <ArticleCard variant="latest-small" key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </BaseBlock>
    );
};

export default RecentArticlesBlock;
