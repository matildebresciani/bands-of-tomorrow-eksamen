import CardLabel from '@/components/atoms/frontend/labels/CardLabel';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import { formatArticleLabel } from '@/lib/utilities/format-label';
import { getArticleUrl } from '@/lib/utilities/get-article-url';
import type { Article } from '@/payload-types';
import Link from 'next/link';

type Props = {
    article: Article;
};

const LatestBigCard = ({ article }: Props) => {
    return (
        <Link href={getArticleUrl(article)} className="group">
            <div className="border lg:border-r-0 h-full flex flex-col bg-transparent transition-colors duration-300 ease-in-out group-hover:bg-black/10">
                <div className="relative w-full overflow-hidden aspect-4/3 border-b max-h-[400px]">
                    {article?.contentMeta?.featuredImage && (
                        <ImageMedia
                            fill
                            fallbackAlt={article?.title || 'Article Image'}
                            resource={article?.contentMeta?.featuredImage}
                            imgClassName="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                            size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                        />
                    )}
                </div>
                <div className="relative">
                    <div className="absolute left-m md:left-l -top-4 z-10">
                        <CardLabel
                            label={formatArticleLabel(article)}
                            type={article.articleType}
                            reviewType={article.reviewType}
                        />
                    </div>
                </div>
                <div className="p-m md:p-l">
                    <div className="flex justify-between md:items-center flex-col md:flex-row gap-1 md:gap-xs mb-s body-md">
                        <div>{article.publishedAt && <span>{formatDateTime(article.publishedAt, 'long')}</span>}</div>
                        <div className="flex gap-3 font-semibold text-fg-faded">
                            {article.artistName && <span>{article.artistName}</span>}
                            {article.genres && article.artistName && <span>|</span>}
                            {article.genres && (
                                <span>
                                    {typeof article.genres[0] === 'string'
                                        ? article.genres[0]
                                        : article.genres[0]?.name}
                                </span>
                            )}
                        </div>
                    </div>
                    <h3 className="line-clamp-4 uppercase heading-4">{article.title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default LatestBigCard;
