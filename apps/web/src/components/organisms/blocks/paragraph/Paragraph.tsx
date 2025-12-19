import type { BC } from '@/lib/types/block-props';
import type { Paragraph as ParagraphProps } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import BaseBlock from '../base-block/BaseBlock';

const ParagraphBlock: BC<ParagraphProps> = ({ block }) => {
    const { richText } = block;

    return (
        <BaseBlock classNameOuter="!pb-section-xxs">
            <div className="oakgrid">
                <div className="col-span-12 md:col-span-10 md:col-start-2">
                    {richText && <RichText data={richText} />}
                </div>
            </div>
        </BaseBlock>
    );
};

export default ParagraphBlock;
