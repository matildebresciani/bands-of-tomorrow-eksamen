'use client';

import type { Gallery1 } from '@/payload-types';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import PaginationButton from '@/components/atoms/frontend/buttons/PaginationButton';
import GalleryCard from '@/components/molecules/frontend/GalleryCard';

type Props = {
    galleries: Gallery1[];
};

const GallerySliderClient = ({ galleries }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div>
            {galleries.length > 4 && (
                <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-1/2 z-10">
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
                {galleries.map((gallery, i) => (
                    <SwiperSlide key={gallery.id} className="w-full !h-auto">
                        <GalleryCard gallery={gallery} index={i} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {galleries.length > 4 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1 lg:translate-x-1/2 z-10">
                    <PaginationButton action="next" onClick={() => swiperRef.current?.slideNext()} />
                </div>
            )}
        </div>
    );
};

export default GallerySliderClient;
