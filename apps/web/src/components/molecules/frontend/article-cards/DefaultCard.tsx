import CardLabel from '@/components/atoms/frontend/labels/CardLabel';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import { formatArticleLabel } from '@/lib/utilities/format-label';
import { getArticleUrl } from '@/lib/utilities/get-article-url';
import type { Article } from '@/payload-types';
import Link from 'next/link';

type Props = {
    article: Article;
    showLabel?: boolean;
    className?: string;
};

const DefaultCard = ({ article, showLabel, className }: Props) => {
    return (
        <Link href={getArticleUrl(article)} className="group">
            <div
                className={`border h-full flex flex-col bg-transparent transition-colors duration-300 ease-in-out group-hover:bg-black/10 ${className}`}
            >
                <div className="relative overflow-hidden w-full aspect-square border-b">
                    {article?.contentMeta?.featuredImage && (
                        <ImageMedia
                            fill
                            fallbackAlt={article?.title || 'Article Image'}
                            resource={article?.contentMeta?.featuredImage}
                            imgClassName="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-120"
                            size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                        />
                    )}
                    {showLabel && (
                        <div className="absolute top-4 left-4 z-10">
                            <CardLabel
                                label={formatArticleLabel(article)}
                                type={article.articleType}
                                reviewType={article.reviewType}
                            />
                        </div>
                    )}
                </div>
                <div className="p-s pb-m flex flex-col gap-s">
                    <div className="flex flex-col gap-1 body-sm">
                        <div>{article.publishedAt && <span>{formatDateTime(article.publishedAt, 'long')}</span>}</div>
                        <div className="flex gap-3 font-semibold text-fg-faded items-start justify-start">
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
                    <h4>{article.title}</h4>
                </div>
            </div>
        </Link>
    );
};

export default DefaultCard;
