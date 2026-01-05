'use client';

import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import ArticleCard from '@/components/molecules/frontend/article-cards/ArticleCard';
import type { Article } from '@/payload-types';
import { motion } from 'motion/react';
import { useState } from 'react';

type Props = {
    articles: Article[];
};

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

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

// const cardVariants = {
//     hidden: {
//         opacity: 0,
//         y: 40,
//     },
//     show: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.45,
//             ease: 'easeOut',
//         },
//     },
// };

const ArticlesArchive = ({ articles }: Props) => {
    if (!articles?.length) return null;

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const gridArticles = articles.slice(1, visibleCount + 1);
    const rows = chunkArray(gridArticles, 3);

    const hasMore = visibleCount < articles.length - 1;

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
                {rows.map((row) => {
                    if (!row[0]) return null; // <-- sikkerhedstjek

                    return (
                        <motion.div
                            key={row[0].id}
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
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-100px' }}
                                        transition={{
                                            duration: 0.45,
                                            ease: 'easeOut',
                                            delay: colIndex * 0.15, // kun desktop stagger
                                        }}
                                    >
                                        <ArticleCard article={article} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
                {hasMore && (
                    <div className="flex justify-center">
                        <BaseButton
                            variant="tertiary"
                            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
                        >
                            Vis flere artikler
                        </BaseButton>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ArticlesArchive;
