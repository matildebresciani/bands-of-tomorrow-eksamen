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

const LatestSmallCard = ({ article }: Props) => {
    return (
        <Link href={getArticleUrl(article)} className="group">
            <div className="border border-t-0 lg:border-t-0 first:lg:border-t h-full grid grid-cols-5 gap-4 p-m bg-transparent transition-colors duration-300 ease-in-out group-hover:bg-black/10">
                <div className="col-span-2 relative w-full overflow-hidden min-h-[100px] aspect-square md:aspect-4/3 lg:aspect-auto">
                    {article?.contentMeta?.featuredImage && (
                        <ImageMedia
                            fill
                            fallbackAlt={article?.title || 'Article Image'}
                            resource={article?.contentMeta?.featuredImage}
                            imgClassName="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-120"
                            size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                        />
                    )}
                    <div className="absolute bottom-0 left-0 z-10 w-full">
                        <CardLabel
                            label={formatArticleLabel(article)}
                            type={article.articleType}
                            reviewType={article.reviewType}
                        />
                    </div>
                </div>

                <div className="col-span-3">
                    <div className="flex justify-between gap-s body-md">
                        <div>{article.publishedAt && <span>{formatDateTime(article.publishedAt, 'long')}</span>}</div>
                        {/* <div className="flex gap-3">
                            {article.genres && (
                                <span>
                                    {typeof article.genres[0] === 'string'
                                        ? article.genres[0]
                                        : article.genres[0]?.name}
                                </span>
                            )}
                            {article.genres && article.artistName && <span>|</span>}
                            {article.artistName && <span>{article.artistName}</span>}
                        </div> */}
                    </div>
                    <h4>{article.title}</h4>
                </div>
            </div>
        </Link>
    );
};

export default LatestSmallCard;
