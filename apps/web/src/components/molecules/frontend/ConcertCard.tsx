import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import { formatDateTime } from '@/lib/utilities/format-date-time';
import { cn } from '@/lib/utilities/ui';
import type { Concert } from '@/payload-types';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
    concert: Concert;
    index?: number;
};

const ConcertCard = ({ concert, index }: Props) => {
    // index er 0-baseret: index % 2 === 0 => "even" (her: blå). index % 2 === 1 => "odd" (her: rød)
    const overlayColor =
        typeof index === 'number' ? (index % 2 === 0 ? 'bg-overlay-blue' : 'bg-overlay-red') : 'bg-overlay-blue';

    return (
        <Link
            href={concert.ticketLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'group flex flex-col md:flex-row md:first:border-t md:border-b md:border-base md:border-x-1',
                'w-full mb-section-xxs md:mb-0 active:bg-black/10 cursor-pointer',
            )}
        >
            {concert?.featuredImage && (
                <div className="relative overflow-hidden aspect-[4/2] md:aspect-square border border-base border-b-0 md:border-none md:border-r md:aspect-square w-full md:w-46 group shrink-0">
                    <ImageMedia
                        fill
                        alt={concert?.artist || 'Concert Image'}
                        resource={concert?.featuredImage}
                        imgClassName="object-cover w-full h-full filter grayscale duration-300 group-hover:grayscale-0"
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                    />
                    {/* Overlay */}
                    <div
                        className={cn(
                            'absolute inset-0 pointer-events-none mix-blend-screen opacity-100 transition-opacity duration-300 group-hover:opacity-0',
                            overlayColor,
                        )}
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row md:p-m md:items-center justify-between gap-s md:w-full bg-transparent transition-colors duration-300 ease-in-out group-hover:bg-black/10">
                <div className="flex justify-between items-end border border-base md:border-0 py-m px-s md:py-0 md:px-0">
                    <div className="flex flex-col gap-1 md:gap-s flex-wrap">
                        <p>{formatDateTime(concert.date, 'dot')}</p>
                        <div>
                            <h4 className="pb-xs uppercase">{concert.artist}</h4>
                            {concert.support && <p className="italic font-light">+ Support: {concert.support}</p>}
                        </div>
                        <p>
                            {concert.venue}, {concert.city}
                        </p>
                    </div>
                    {/* {concert.ticketLink && (
                        <div className="size-[50px] flex justify-center items-center bg-button-secondary text-fg-on-color border border-bg-base md:hidden shrink-0">
                            <ArrowUpRight />
                        </div>
                    )} */}
                </div>
                {concert.ticketLink && (
                    <BaseButton
                        className="h-fit hidden md:block shrink-0"
                        variant="secondary"
                        title="SE EVENT"
                        // type="link"
                        // openNewTab
                        // href={concert.ticketLink}
                    />
                )}
            </div>
        </Link>
    );
};

export default ConcertCard;
