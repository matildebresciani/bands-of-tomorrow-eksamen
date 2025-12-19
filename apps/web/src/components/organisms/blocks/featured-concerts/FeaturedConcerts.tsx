import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
import { Heading } from '@/components/atoms/frontend/heading/Heading';
import ConcertCard from '@/components/molecules/frontend/ConcertCard';
import { initPayload } from '@/lib/config';
import type { BC } from '@/lib/types/block-props';
import type { FeaturedConcerts as FeaturedConcertsProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const FeaturedConcertsBlock: BC<FeaturedConcertsProps> = async ({ block, locale }) => {
    const { heading, addLink, link } = block;

    //fetcher kun de 4 næste kommende koncerter fra dags dato
    const payload = await initPayload();
    const concertsRes = await payload.find({
        collection: 'concerts',
        where: {
            date: {
                greater_than: new Date().toISOString(),
            },
        },
        sort: 'date',
        limit: 4,
    });

    const concerts = concertsRes.docs;
    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12">
                    <Heading level={2} className="mb-section-xxs">
                        {heading}
                    </Heading>
                    <div className="w-full mb-l">
                        {concerts.map((concert, i) => (
                            <ConcertCard key={concert.id} concert={concert} index={i} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        {addLink && link && <DynamicButton link={link} variant="tertiary" />}
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default FeaturedConcertsBlock;
