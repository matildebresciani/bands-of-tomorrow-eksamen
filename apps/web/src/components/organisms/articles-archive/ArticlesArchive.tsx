'use client';

import ArticleCard from '@/components/molecules/frontend/article-cards/ArticleCard';
import type { Article } from '@/payload-types';
import { motion } from 'motion/react';

type Props = {
    articles: Article[];
};

const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

const rowVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: 'easeOut',
        },
    },
};

const ArticlesArchive = ({ articles }: Props) => {
    if (!articles?.length) return null;

    const gridArticles = articles.slice(1);
    const rows = chunkArray(gridArticles, 3);

    return (
        <section className="space-y-section-sm">
            {/* Featured article */}
            {articles[0] && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <ArticleCard article={articles[0]} variant="featured" />
                </motion.div>
            )}

            {/* Rows */}
            <div className="grid grid-cols-1 gap-y-section-xxs md:gap-y-section-xs">
                {rows.map((row, rowIndex) => (
                    <motion.div
                        key={rowIndex}
                        className="col-span-full"
                        variants={rowVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-120px' }}
                    >
                        <div className="grid md:grid-cols-3 gap-4">
                            {row.map((article, colIndex) => (
                                <motion.div
                                    key={article.id}
                                    variants={cardVariants}
                                    transition={{
                                        delay: colIndex * 0.15,
                                    }}
                                >
                                    <ArticleCard article={article} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
                {/* TODO: Show more button */}
            </div>
        </section>
    );
};

export default ArticlesArchive;
