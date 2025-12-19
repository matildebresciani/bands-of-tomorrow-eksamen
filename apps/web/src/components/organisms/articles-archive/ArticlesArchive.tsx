'use client';

import ArticleCard from '@/components/molecules/frontend/article-cards/ArticleCard';
import type { Article } from '@/payload-types';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
    articles: Article[];
};

const ArticlesArchive = ({ articles }: Props) => {
    if (!articles?.length) return null;

    return (
        <section className="space-y-section-sm">
            {articles[0] && (
                <motion.div
                    key={articles[0].id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <ArticleCard article={articles[0]} variant="featured" />
                </motion.div>
            )}
            <div className="grid md:grid-cols-3 gap-4 gap-y-section-xxs md:gap-y-section-xs">
                <AnimatePresence mode="popLayout">
                    {articles.slice(1).map((article) => (
                        <motion.div
                            key={article.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                        >
                            <ArticleCard key={article.id} article={article} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {/* TODO: Show more button */}
            </div>
        </section>
    );
};

export default ArticlesArchive;
