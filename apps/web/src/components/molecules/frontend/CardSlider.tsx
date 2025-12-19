'use client';

import ArticleCard from '@/components/molecules/frontend/article-cards/ArticleCard';
import type { Article } from '@/payload-types';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import PaginationButton from '@/components/atoms/frontend/buttons/PaginationButton';

type Props = {
    articles: Article[];
};

const CardSlider = ({ articles }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div>
            {articles.length > 4 && (
                <div className="hidden md:block absolute left-0 top-1/3 transform -translate-x-1/2 z-10">
                    <PaginationButton action="prev" onClick={() => swiperRef.current?.slidePrev()} />
                </div>
            )}

            <Swiper
                spaceBetween={16}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1.3,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                className="!overflow-visible md:!overflow-hidden"
            >
                {articles.map((article) => (
                    <SwiperSlide key={article.id} className="w-full !h-auto">
                        <ArticleCard article={article} className="flex-grow" />
                    </SwiperSlide>
                ))}
            </Swiper>
            {articles.length > 4 && (
                <div className="hidden md:block absolute right-0 top-1/3 transform translate-x-1 lg:translate-x-1/2 z-10">
                    <PaginationButton action="next" onClick={() => swiperRef.current?.slideNext()} />
                </div>
            )}
        </div>
    );
};

export default CardSlider;
