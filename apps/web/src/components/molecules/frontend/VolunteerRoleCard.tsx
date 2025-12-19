import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { Media } from '@/payload-types';

type Props = {
    thumbnail?: Media | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
};

const VolunteerRoleCard = ({ thumbnail, title, description }: Props) => {
    return (
        <div className="flex flex-col md:flex-row border border-solid border-base max-w-[590px]">
            {thumbnail && typeof thumbnail !== 'string' && (
                <div className="w-full md:w-[285px] overflow-hidden">
                    <ImageMedia
                        resource={thumbnail}
                        fallbackAlt={thumbnail.alt || 'Volunteer role thumbnail'}
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1280px) 33vw"
                        imgClassName="object-cover w-full h-full"
                    />
                </div>
            )}
            <div className="flex flex-col p-s gap-s md:border-l border-base flex-1">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default VolunteerRoleCard;
