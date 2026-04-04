'use client';

import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { cn } from '@/lib/utilities/ui';
import type { Media } from '@/payload-types';
import React, { useEffect, useState } from 'react';
import GalleryLightbox from './components/GalleryLightbox';

type Props = {
    images: Media[];
    galleryTitle: string;
    className?: string;
};

const GalleryImageTile = ({
    image,
    index,
    onOpen,
}: { image: Media; index: number; onOpen: (index: number) => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const aspectRatio = image.width && image.height ? `${image.width} / ${image.height}` : '4 / 5';

    return (
        <button
            type="button"
            className="mb-xs block break-inside-avoid cursor-zoom-in md:mb-s"
            onClick={() => onOpen(index)}
            aria-label={`Open image ${index + 1}`}
        >
            <span className="grid overflow-hidden border border-border-base" style={{ aspectRatio }}>
                {!isLoaded && (
                    <span className="col-start-1 row-start-1 animate-pulse bg-bg-subtle" aria-hidden="true" />
                )}
                <ImageMedia
                    resource={image}
                    imgClassName={cn(
                        'col-start-1 row-start-1 h-full w-full object-cover transition duration-500 ease-out hover:scale-105',
                        isLoaded ? 'opacity-100' : 'opacity-0',
                    )}
                    onLoad={() => setIsLoaded(true)}
                    size="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
            </span>
        </button>
    );
};

export default function GalleryGrid({ images, galleryTitle, className }: Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

    useEffect(() => {
        if (activeIndex === null) return;

        const { body } = document;
        const previousOverflow = body.style.overflow;
        body.style.overflow = 'hidden';

        return () => {
            body.style.overflow = previousOverflow;
        };
    }, [activeIndex]);

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* GRID */}
            <div className={cn('columns-2 md:columns-3 gap-xs md:gap-s', className)}>
                {images.map((image, index) => (
                    <GalleryImageTile key={image.id} image={image} index={index} onOpen={setActiveIndex} />
                ))}
            </div>

            {/* LIGHTBOX */}
            {activeIndex !== null && (
                <GalleryLightbox
                    images={images}
                    galleryTitle={galleryTitle}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    onClose={() => setActiveIndex(null)}
                />
            )}
        </>
    );
}
