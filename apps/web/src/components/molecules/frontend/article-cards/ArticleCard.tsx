import type { Article } from '@/payload-types';
import DefaultCard from './DefaultCard';
import FeaturedCard from './FeaturedCard';
import LatestBigCard from './LatestBigCard';
import LatestSmallCard from './LatestSmallCard';

type Props = {
    article: Article;
    variant?: 'default' | 'featured' | 'latest-big' | 'latest-small';
    showLabel?: boolean;
    className?: string;
};

export default function ArticleCard({ article, variant = 'default', showLabel = true, className }: Props) {
    switch (variant) {
        case 'featured':
            return <FeaturedCard article={article} showLabel={showLabel} className={className} />;
        case 'latest-big':
            return <LatestBigCard article={article} />;
        case 'latest-small':
            return <LatestSmallCard article={article} />;
        default:
            return <DefaultCard article={article} showLabel={showLabel} className={className} />;
    }
}
