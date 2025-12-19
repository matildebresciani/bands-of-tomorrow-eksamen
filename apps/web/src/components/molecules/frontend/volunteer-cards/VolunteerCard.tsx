import type { Volunteer } from '@/payload-types';
import VolunteerMain from './VolunteerMain';
import VolunteerSmall from './VolunteerSmall';

type Props = {
    variant?: 'main' | 'small';
    volunteer?: Volunteer;
};

const VolunteerCard = ({ variant = 'main', volunteer }: Props) => {
    switch (variant) {
        case 'small':
            return <VolunteerSmall volunteer={volunteer} />;
        default:
            return <VolunteerMain volunteer={volunteer} />;
    }
};

export default VolunteerCard;
