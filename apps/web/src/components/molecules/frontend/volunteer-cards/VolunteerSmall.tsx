import { formatVolunteerRole } from '@/lib/utilities/format-volunteer-role';
import type { Volunteer } from '@/payload-types';

type Props = {
    volunteer?: Volunteer;
};

const VolunteerSmall = ({ volunteer }: Props) => {
    const role = formatVolunteerRole(volunteer);

    return (
        <div className="block border-b border-solid border-base w-full py-m">
            <h3 className="heading-4 uppercase pb-xs">{volunteer?.displayName || volunteer?.volunteerName}</h3>
            {role && <span className="italic body-md">{role}</span>}
        </div>
    );
};

export default VolunteerSmall;
