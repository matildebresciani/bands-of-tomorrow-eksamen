// import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
// import VolunteerCard from '@/components/molecules/frontend/volunteer-cards/VolunteerCard';
// import type { BC } from '@/lib/types/block-props';
// import type { VolunteersTeam as VolunteersTeamProps } from '@/payload-types';
// import { Divide } from 'lucide-react';
// import BaseBlock from '../base-block/BaseBlock';

// const VolunteersTeamBlock: BC<VolunteersTeamProps> = ({ block, locale }) => {
//     const { volunteersTeam, addLink, footerText, link } = block;

//     return (
//         <BaseBlock>
//             <div className="oakgrid">
//                 <div className="col-span-12 md:col-start-3 md:col-span-8">
//                     {volunteersTeam?.map((volunteer) => {
//                         if (typeof volunteer === 'string') return null;
//                         return <VolunteerCard key={volunteer.id} volunteer={volunteer} variant="small" />;
//                     })}
//                 </div>
//                 <div className="col-span-12 md:col-start-4 md:col-span-6 mt-l">
//                     {addLink && link && (
//                         <div className="flex flex-col text-center">
//                             {footerText && <h3 className="uppercase heading-4">{footerText}</h3>}
//                             <DynamicButton className="w-fit self-center mt-m" link={link} />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </BaseBlock>
//     );
// };

// export default VolunteersTeamBlock;
'use client';
import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
import VolunteerCard from '@/components/molecules/frontend/volunteer-cards/VolunteerCard';
import type { BC } from '@/lib/types/block-props';
import type { VolunteersTeam as VolunteersTeamProps } from '@/payload-types';
import { useState } from 'react';
import BaseBlock from '../base-block/BaseBlock';

const VISIBLE_COUNT = 5;

const VolunteersTeamBlock: BC<VolunteersTeamProps> = ({ block, locale }) => {
    const { volunteersTeam, addLink, footerText, link } = block;
    const [isOpen, setIsOpen] = useState(false);

    const volunteers = volunteersTeam?.filter((v) => typeof v !== 'string') ?? [];

    const visibleVolunteers = isOpen ? volunteers : volunteers.slice(0, VISIBLE_COUNT);

    const hasMoreThanVisible = volunteers.length > VISIBLE_COUNT;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 md:col-start-3 md:col-span-8">
                    {visibleVolunteers.map((volunteer) => (
                        <VolunteerCard key={volunteer.id} volunteer={volunteer} variant="small" />
                    ))}

                    {hasMoreThanVisible && (
                        <div className="flex justify-center mt-m">
                            <DynamicButton variant="tertiary" onClick={() => setIsOpen((prev) => !prev)}>
                                {isOpen ? '- Vis færre frivillige' : '+ Vis flere frivillige'}
                            </DynamicButton>
                        </div>
                    )}
                </div>

                <div className="col-span-12 md:col-start-4 md:col-span-6 mt-l">
                    {addLink && link && (
                        <div className="flex flex-col text-center">
                            {footerText && <h3 className="uppercase heading-4">{footerText}</h3>}
                            <DynamicButton className="w-fit self-center mt-m" link={link} />
                        </div>
                    )}
                </div>
            </div>
        </BaseBlock>
    );
};

export default VolunteersTeamBlock;
