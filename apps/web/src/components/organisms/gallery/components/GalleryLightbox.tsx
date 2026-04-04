'use client';

import PaginationButton from '@/components/atoms/frontend/buttons/PaginationButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { cn } from '@/lib/utilities/ui';
import type { Media } from '@/payload-types';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Keyboard, Mousewheel, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

type Props = {
    images: Media[];
    galleryTitle: string;
    activeIndex: number;
    onClose: () => void;
    setActiveIndex?: (index: number) => void;
};

const GalleryLightbox = ({ images, galleryTitle, activeIndex, onClose, setActiveIndex }: Props) => {
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    useEffect(() => {
        if (!mainSwiper || mainSwiper.destroyed || mainSwiper.activeIndex === activeIndex) return;
        mainSwiper.slideTo(activeIndex);
    }, [activeIndex, mainSwiper]);

    return (
        <dialog
            open
            className="fixed inset-0 z-50 m-0 flex h-dvh max-h-none w-screen max-w-none items-center justify-center border-0 bg-fg-base/85 p-0 text-fg-on-color md:bg-fg-base/80 md:p-s"
            tabIndex={-1}
            onClick={onClose}
            onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
            }}
        >
            <div
                className="flex h-dvh w-screen flex-col gap-xs bg-bg-base px-xs py-xs text-fg-base md:h-full md:max-w-[96rem] md:gap-s md:border md:border-border-base md:px-s md:py-s md:backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-xs border-b border-border-base pb-xs md:gap-s">
                    <div className="min-w-0">
                        <p className="body-sm uppercase text-fg-faded">Galleri</p>
                        <p className="body-md truncate">{galleryTitle}</p>
                    </div>

                    <div className="flex items-center gap-xs md:gap-s">
                        <span className="body-md text-fg-faded">
                            {activeIndex + 1} / {images.length}
                        </span>
                        <button
                            type="button"
                            aria-label="Luk galleri"
                            className="flex size-[44px] items-center justify-center transition-colors cursor-pointer md:size-[50px]"
                            onClick={onClose}
                        >
                            <X size={18} className="md:size-5" />
                        </button>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-s">
                    <PaginationButton
                        action="prev"
                        onClick={() => mainSwiper?.slidePrev()}
                        className="hidden shrink-0 self-center md:flex"
                    />

                    <div className="h-full min-w-0 overflow-hidden">
                        <Swiper
                            modules={[Thumbs, Keyboard]}
                            initialSlide={activeIndex}
                            keyboard
                            onSwiper={setMainSwiper}
                            onSlideChange={(swiper) => setActiveIndex?.(swiper.activeIndex)}
                            spaceBetween={24}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            className="h-full"
                        >
                            {images.map((image) => (
                                <SwiperSlide key={image.id}>
                                    <div className="flex h-full min-h-0 items-center justify-center py-xs md:h-[min(68vh,52rem)] md:py-0">
                                        <ImageMedia
                                            resource={image}
                                            priority
                                            imgClassName="max-h-full w-auto max-w-full object-contain"
                                            size="(min-width: 768px) 80vw, 100vw"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <PaginationButton
                        action="next"
                        onClick={() => mainSwiper?.slideNext()}
                        className="hidden shrink-0 self-center md:flex"
                    />
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-xs border-t border-border-base pt-xs md:hidden">
                    <PaginationButton
                        action="prev"
                        onClick={() => mainSwiper?.slidePrev()}
                        className="size-[44px] shrink-0"
                    />

                    <PaginationButton
                        action="next"
                        onClick={() => mainSwiper?.slideNext()}
                        className="size-[44px] shrink-0"
                    />
                </div>

                <div className="border-t border-border-base pt-xs">
                    <Swiper
                        modules={[FreeMode, Mousewheel, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        watchSlidesProgress
                        watchOverflow
                        resistanceRatio={0}
                        freeMode={{
                            enabled: true,
                            momentumBounce: false,
                            sticky: true,
                        }}
                        grabCursor
                        mousewheel={{
                            forceToAxis: true,
                            releaseOnEdges: false,
                        }}
                        slidesPerView="auto"
                        spaceBetween={8}
                        className="w-full cursor-grab active:cursor-grabbing [&_.swiper-slide]:!w-[88px] md:[&_.swiper-slide]:!w-[96px]"
                        breakpoints={{
                            768: {
                                spaceBetween: 12,
                            },
                        }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={image.id}>
                                <button
                                    type="button"
                                    onClick={() => mainSwiper?.slideTo(index)}
                                    className={cn(
                                        'grid aspect-square w-full overflow-hidden border transition border-border-base',
                                        index === activeIndex
                                            ? 'bg-bg-section-2'
                                            : 'bg-button-subtle opacity-70 hover:opacity-100',
                                    )}
                                    aria-label={`Go to image ${index + 1}`}
                                >
                                    <ImageMedia
                                        resource={image}
                                        imgClassName="col-start-1 row-start-1 h-full w-full object-cover"
                                        size="(min-width: 768px) 96px, 88px"
                                    />
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </dialog>
    );
};

export default GalleryLightbox;
