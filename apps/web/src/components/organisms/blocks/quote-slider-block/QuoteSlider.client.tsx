'use client';

import PaginationBullets from '@/components/molecules/frontend/PaginationBullets';
import Quote from '@/components/molecules/frontend/Quote';
import type { Quote1 } from '@/payload-types';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

type Props = {
    quotes: Quote1[];
};

const QuoteSliderClient = ({ quotes }: Props) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const isSlider = quotes.length > 1;

    const swiperSpeed = 1000;
    const swiperAutoplayDelay = 5000;
    return (
        <div className="oakgrid">
            <div className="col-span-12">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{ delay: swiperAutoplayDelay }}
                    loop
                    speed={swiperSpeed}
                    onSwiper={setSwiper}
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                    modules={[EffectFade, Autoplay]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                >
                    {quotes.map((quote) => (
                        <SwiperSlide key={quote.id}>
                            <Quote quoteText={quote.quote} name={quote.author} showName={!!quote.author} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {isSlider && (
                    <div className="col-span-12 pointer-events-auto mt-l">
                        <PaginationBullets
                            totalSlides={quotes.length}
                            currentSlide={activeSlide}
                            onBulletClick={(i) => swiper?.slideToLoop(i)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteSliderClient;
