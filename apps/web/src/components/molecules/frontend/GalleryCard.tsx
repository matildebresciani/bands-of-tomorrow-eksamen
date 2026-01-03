import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import { cn } from '@/lib/utilities/ui';
import type { Gallery1, Media } from '@/payload-types';
import Link from 'next/link';

type Props = {
    gallery: Gallery1;
};

const GalleryCard = ({ gallery }: Props) => {
    const firstImage = gallery.images?.find((img): img is Media => typeof img === 'object') ?? null;
    return (
        <Link href={`/galleri/${gallery.slug}`} className="group block">
            <div className="border flex flex-col h-full">
                <div className="relative aspect-square overflow-hidden">
                    {firstImage && (
                        <ImageMedia
                            resource={firstImage}
                            fill
                            imgClassName="object-cover transition-transform duration-500 grayscale group-hover:scale-105 group-hover:grayscale-0"
                            size="100vw, (min-width: 768px) 33vw"
                        />
                    )}
                    <div
                        className={cn(
                            'absolute inset-0 pointer-events-none mix-blend-screen opacity-100 transition-opacity duration-300 group-hover:opacity-0 bg-overlay-blue',
                        )}
                    />
                </div>

                <div className="p-s flex flex-col bg-bg-base gap-1 body-sm">
                    {gallery.galleryDate && <span>{formatDateTime(gallery.galleryDate, 'long')}</span>}
                    <h3 className="heading-5">{gallery.title}</h3>
                    {gallery.venue && <span>{gallery.venue}</span>}
                </div>
            </div>
        </Link>
    );
};

export default GalleryCard;
