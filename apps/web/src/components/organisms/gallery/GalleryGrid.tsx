'use client';

import PaginationButton from '@/components/atoms/frontend/buttons/PaginationButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { cn } from '@/lib/utilities/ui';
import type { Media } from '@/payload-types';
import React, { useEffect, useState } from 'react';
import LightboxDesktop from './components/LightboxDesktop';
import LightboxMobile from './components/LightboxMobile';

type Props = {
    images: Media[];
    className?: string;
};

export default function GalleryGrid({ images, className }: Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const activeImage = activeIndex !== null ? images[activeIndex] : null;

    useEffect(() => {
        if (activeIndex === null) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveIndex(null);
            }

            if (e.key === 'ArrowRight') {
                setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : prev));
            }

            if (e.key === 'ArrowLeft') {
                setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : prev));
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeIndex, images.length]);

    if (!images || images.length === 0) return null;

    const goNext = () => {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % images.length : prev));
    };

    const goPrev = () => {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : prev));
    };

    return (
        <>
            {/* GRID */}
            <div className={cn('columns-2 md:columns-3 gap-xs md:gap-s', className)}>
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        type="button"
                        className="mb-xs md:mb-s break-inside-avoid cursor-zoom-in  overflow-hidden"
                        onClick={() => setActiveIndex(index)}
                    >
                        <ImageMedia
                            resource={image}
                            imgClassName="w-full h-auto transition-transform duration-500 ease-out hover:scale-120"
                            size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                        />
                    </button>
                ))}
            </div>

            {/* LIGHTBOX */}
            {activeIndex !== null && (
                <>
                    {/* MOBILE */}
                    <div className="md:hidden">
                        <LightboxMobile
                            images={images}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            onClose={() => setActiveIndex(null)}
                        />
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden md:block">
                        <LightboxDesktop
                            images={images}
                            activeIndex={activeIndex}
                            onClose={() => setActiveIndex(null)}
                            onNext={goNext}
                            onPrev={goPrev}
                        />
                    </div>
                </>
            )}
        </>
    );
}
