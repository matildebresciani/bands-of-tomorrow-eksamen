import { Heading } from '@/components/atoms/frontend/heading/Heading';
import type { BC } from '@/lib/types/block-props';
import type { HeadingBlock as HeadingBlockProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const HeadingBlock: BC<HeadingBlockProps> = ({ block }) => {
    const { heading, headingType } = block;

    const level = (headingType === '1' ? 1 : 2) as 1 | 2;

    return (
        <article className="pt-section-xs md:pt-section-m">
            <BaseBlock>
                <div className="oakgrid">
                    <div className="col-span-12">
                        <Heading level={level}>{heading}</Heading>
                    </div>
                </div>
            </BaseBlock>
        </article>
    );
};

export default HeadingBlock;
