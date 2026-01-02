'use client';

import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { cn } from '@/lib/utilities/ui';
import type { Media } from '@/payload-types';
import React, { useEffect, useState } from 'react';

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

    return (
        <>
            {/* GRID */}
            <div className={cn('columns-2 md:columns-3 gap-4', className)}>
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        type="button"
                        className="mb-4 break-inside-avoid cursor-zoom-in"
                        onClick={() => setActiveIndex(index)}
                    >
                        <ImageMedia
                            resource={image}
                            imgClassName="w-full h-auto"
                            size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                        />
                    </button>
                ))}
            </div>

            {/* LIGHTBOX */}
            {activeImage && (
                <button
                    type="button"
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    aria-modal="true"
                    onClick={() => setActiveIndex(null)}
                >
                    <div className="max-w-5xl max-h-full">
                        <ImageMedia
                            resource={activeImage}
                            priority
                            imgClassName="w-auto h-auto max-h-[90vh]"
                            size="100vw"
                        />
                    </div>
                </button>
            )}
        </>
    );
}
