import VolunteerCard from '@/components/molecules/frontend/volunteer-cards/VolunteerCard';
import type { BC } from '@/lib/types/block-props';
import { cn } from '@/lib/utilities/ui';
import type { TextCard as TextCardProps } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import BaseBlock from '../base-block/BaseBlock';

const TextCardBlock: BC<TextCardProps> = ({ block, locale }) => {
    const { addBgColor, richText, volunteer } = block;

    return (
        <BaseBlock
            classNameOuter={cn(addBgColor && 'bg-bg-highlight text-fg-on-color !py-xl mb-section-xs md:mb-section-m')}
        >
            <div className="oakgrid">
                <div className="col-span-12 md:col-span-7">{richText && <RichText data={richText} />}</div>
                <div className="col-span-12 md:col-span-4">
                    {typeof volunteer !== 'string' && volunteer && <VolunteerCard volunteer={volunteer} />}
                </div>
            </div>
        </BaseBlock>
    );
};

export default TextCardBlock;
