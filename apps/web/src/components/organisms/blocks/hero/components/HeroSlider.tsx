'use client';

import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { Article, Hero as HeroProps } from '@/payload-types';
import { act, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import CardLabel from '@/components/atoms/frontend/labels/CardLabel';
import PaginationBullets from '@/components/molecules/frontend/PaginationBullets';
import { formatArticleLabel } from '@/lib/utilities/format-label';
import { getArticleUrl } from '@/lib/utilities/get-article-url';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
    featuredArticles: Article[];
};

const HeroSlider = ({ featuredArticles }: Props) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);

    // If no featured articles → render nothing
    if (!Array.isArray(featuredArticles) || featuredArticles.length === 0) return null;

    const isSlider = featuredArticles.length > 1;
    const activeHeroSlide = featuredArticles[activeSlide] as Article;

    const swiperSpeed = 1000;
    const swiperAutoplayDelay = 5000;

    const router = useRouter();

    return (
        <div className="min-svh-screen-incl-header relative w-full text-fg-on-color flex items-end">
            {/* Background slider */}
            {isSlider ? (
                <Swiper
                    onSwiper={(swiper) => setSwiper(swiper)}
                    modules={[EffectCreative, Autoplay]}
                    loop={true}
                    effect="creative"
                    speed={swiperSpeed}
                    autoplay={{ delay: swiperAutoplayDelay }}
                    creativeEffect={{
                        prev: { translate: ['-20%', 0, -1] },
                        next: { translate: ['100%', 0, 0] },
                    }}
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                    className="!absolute inset-0"
                >
                    {featuredArticles.map((article, idx) => {
                        const img = article?.contentMeta?.featuredImage;
                        if (!img || typeof img !== 'object') return null;

                        return (
                            <SwiperSlide
                                key={article.id || idx}
                                onClick={() => {
                                    // Kun navigér hvis brugeren IKKE swipede
                                    router.push(getArticleUrl(article));
                                }}
                                className="cursor-pointer"
                            >
                                <ImageMedia resource={img} imgClassName="object-cover w-full h-full" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                featuredArticles[0]?.contentMeta?.featuredImage &&
                typeof featuredArticles[0].contentMeta?.featuredImage === 'object' && (
                    <div className="absolute inset-0">
                        <ImageMedia
                            resource={featuredArticles[0].contentMeta.featuredImage}
                            imgClassName="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                )
            )}

            {/* Hero text overlay */}
            <div className="base-block z-20 pb-m oakgrid relative pointer-events-none">
                <div className="w-full col-span-12">
                    <AnimatePresence mode="wait">
                        {activeHeroSlide && (
                            <motion.div
                                key={activeHeroSlide.id || activeSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className="w-full grid grid-cols-subgrid"
                            >
                                <div className="col-span-12 w-fit mb-m">
                                    <CardLabel
                                        label={formatArticleLabel(activeHeroSlide)}
                                        type={activeHeroSlide.articleType}
                                        reviewType={activeHeroSlide.reviewType}
                                    />
                                </div>
                                {/* TITLE */}
                                <h3 className="col-span-12">{activeHeroSlide.title}</h3>

                                {/* EXCERPT */}
                                {activeHeroSlide.contentMeta?.excerpt && (
                                    <p className="col-span-12 max-w-[65ch] mt-base italic line-clamp-3">
                                        {activeHeroSlide.contentMeta.excerpt}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {isSlider && (
                    <div className="col-span-12 pointer-events-auto mt-l">
                        <PaginationBullets
                            totalSlides={featuredArticles.length}
                            currentSlide={activeSlide}
                            onBulletClick={(i) => swiper?.slideToLoop(i)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSlider;
