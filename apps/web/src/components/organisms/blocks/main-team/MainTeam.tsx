import { Heading } from '@/components/atoms/frontend/heading/Heading';
import VolunteerCard from '@/components/molecules/frontend/volunteer-cards/VolunteerCard';
import type { BC } from '@/lib/types/block-props';
import type { MainTeam as MainTeamProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const MainTeamBlock: BC<MainTeamProps> = ({ block, locale }) => {
    const { heading, mainVolunteers } = block;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 md:col-span-8 md:col-start-3">
                    {heading && <h2 className="uppercase mb-m text-center">{heading}</h2>}
                    <div className="grid md:grid-cols-2 gap-x-m gap-y-l">
                        {mainVolunteers?.map((volunteer) => {
                            if (typeof volunteer === 'string') return null;
                            return <VolunteerCard key={volunteer.id} volunteer={volunteer} />;
                        })}
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default MainTeamBlock;
