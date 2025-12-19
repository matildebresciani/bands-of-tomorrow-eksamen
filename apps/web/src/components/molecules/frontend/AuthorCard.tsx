import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { Volunteer } from '@/payload-types';
import Image from 'next/image';

type Props = {
    author: Volunteer | string | null | undefined;
};

const AuthorCard = ({ author }: Props) => {
    if (!author || typeof author === 'string') {
        return null;
    }

    const picture = author.profilePicture;
    const populatedPicture = picture && typeof picture !== 'string' ? picture : null;

    return (
        <div className="p-m flex gap-s border w-full md:w-fit">
            <div className="relative overflow-hidden w-24 aspect-square">
                {populatedPicture ? (
                    <ImageMedia
                        fill
                        fallbackAlt={author?.volunteerName || 'Author Image'}
                        imgClassName="object-cover w-full h-full"
                        resource={populatedPicture}
                        size="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                    />
                ) : (
                    <Image
                        src="/images/svgs/placeholder.svg"
                        alt={author?.volunteerName || 'Volunteer Image'}
                        fill
                        sizes="100vw, (min-width: 769px) 50vw, (min-width: 1281px) 33vw"
                        className="object-cover w-full h-full"
                    />
                )}
            </div>
            <div className="flex flex-col items-left justify-center gap-xs">
                <span>{author.volunteerName}</span>
                {author.email && <span className="body-md">{author.email}</span>}
            </div>
        </div>
    );
};

export default AuthorCard;
