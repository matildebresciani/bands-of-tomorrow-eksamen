import type { BC } from '@/lib/types/block-props';
import type { Hero as HeroProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { getCachedEntriesByIds } from '@/lib/data/payload/get-cached-entries-by-id';
import HeroSlider from './components/HeroSlider';

const HeroBlock: BC<HeroProps> = async ({ block, locale }) => {
    const { featuredArticles } = block;

    const fetchedArticles = await getCachedEntriesByIds({
        collection: 'articles',
        ids: featuredArticles?.map((article) => (typeof article === 'string' ? article : article.id)),
        locale,
    });

    return (
        <BaseBlock className="!p-0 !max-w-full" classNameOuter="!px-0">
            <HeroSlider featuredArticles={fetchedArticles || []} />
        </BaseBlock>
    );
};

export default HeroBlock;
