import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
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

const FeaturedCard = ({ article, showLabel, className }: Props) => {
    return (
        <Link className={`oakgrid gap-0 border group ${className}`} href={getArticleUrl(article)}>
            <div className="col-span-12 p-m md:col-span-5 order-2 md:order-1 h-full bg-transparent transition-colors duration-300 ease-in-out group-hover:bg-black/10">
                <div className="flex flex-col md:flex-row justify-between pb-s md:items-center gap-1 body-md">
                    {article.genres || article.artistName ? (
                        <div className="flex gap-3 font-semibold order-2 md:order-1 text-fg-faded">
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
                    ) : null}
                    <div>{article.publishedAt && <span>{formatDateTime(article.publishedAt, 'long')}</span>}</div>
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="uppercase pb-m">{article.title}</h3>
                    <p className="pb-base">{article.contentMeta?.excerpt}</p>
                    <BaseButton variant="primary" title="Læs artikel" className="mt-auto w-fit" />
                </div>
            </div>
            <div className="col-span-12 md:col-span-7 md:order-2 order-1 relative overflow-hidden w-full border-b md:border-b-0 md:border-l min-h-[400px] md:min-h-[500px]">
                {article?.contentMeta?.featuredImage && (
                    <ImageMedia
                        fill
                        fallbackAlt={article?.title || 'Article Image'}
                        resource={article?.contentMeta?.featuredImage}
                        imgClassName="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-120"
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
        </Link>
    );
};

export default FeaturedCard;
