import VolunteerRoleCard from '@/components/molecules/frontend/VolunteerRoleCard';
import type { BC } from '@/lib/types/block-props';
import type { VolunteerRoles as VolunteerRolesProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const VolunteerRolesBlock: BC<VolunteerRolesProps> = ({ block }) => {
    const { heading, roles } = block;

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="grid col-span-12 justify-items-center gap-section-xxs">
                    <h2 className="heading-3 uppercase text-center">{heading}</h2>
                    <div className="grid lg:grid-cols-2 gap-y-l gap-x-m">
                        {roles.map((role) => (
                            <VolunteerRoleCard
                                key={role.id}
                                thumbnail={typeof role.roleThumbnail === 'string' ? undefined : role.roleThumbnail}
                                title={role?.volunteerRole}
                                description={role?.roleDescription}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default VolunteerRolesBlock;
