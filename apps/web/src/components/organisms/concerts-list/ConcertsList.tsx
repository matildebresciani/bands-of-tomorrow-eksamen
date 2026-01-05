import ConcertCard from '@/components/molecules/frontend/ConcertCard';
import type { Concert } from '@/payload-types';

type Props = {
    concerts: Concert[];
    className?: string;
};

const ConcertsList = ({ concerts, className }: Props) => {
    // Midlertidig: inkluder ALLE koncerter
    const upcoming = concerts;

    // Gruppér efter måned
    const groupedByMonth = upcoming.reduce((acc: Record<string, Concert[]>, concert) => {
        const date = new Date(concert.date);
        const monthName = date.toLocaleDateString('da-DK', {
            month: 'long',
            year: 'numeric',
        });

        if (!acc[monthName]) acc[monthName] = [];
        acc[monthName].push(concert);

        return acc;
    }, {});

    // Global tæller på tværs af grupper
    const globalIndex = 0;

    return (
        <div className={className}>
            {Object.entries(groupedByMonth).map(([month, concerts]) => (
                <div key={month} className="oakgrid auto-rows-max">
                    {/* Sticky heading i venstre kolonne */}
                    <h2 className="heading-xl h-fit col-span-12 md:col-span-3 md:sticky top-[var(--header-height)] md:top-[var(--header-height-desktop)] text-center uppercase md:text-start mb-section-xs md:mb-0 w-fit z-10">
                        {month}
                    </h2>

                    {/* Concert cards i højre kolonne som flex-column */}
                    <div className="col-span-12 md:col-start-5 md:col-span-8 flex flex-col">
                        {concerts.map((concert, idx) => (
                            <ConcertCard key={concert.id} concert={concert} index={idx} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConcertsList;
