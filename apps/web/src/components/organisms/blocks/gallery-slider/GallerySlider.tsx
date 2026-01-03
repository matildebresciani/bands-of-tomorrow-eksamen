import { Heading } from '@/components/atoms/frontend/heading/Heading';
import CardSlider from '@/components/molecules/frontend/CardSlider';
import { initPayload } from '@/lib/config';
import type { BC } from '@/lib/types/block-props';
import type { GallerySlider as GallerySliderProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';
import BackgroundHeadings from './BackgroundHeadings';
import GallerySliderClient from './GallerySlider.client';

const GallerySliderBlock: BC<GallerySliderProps> = async ({ block }) => {
    // const {} = block;

    const payload = await initPayload();

    const galleriesRes = await payload.find({
        collection: 'galleries',
        sort: '-publishedAt',
        limit: 10,
    });

    return (
        <BaseBlock classNameOuter="overflow-hidden">
            <div className="oakgrid">
                <div className="col-span-12">
                    <div className="relative max-w-full">
                        <BackgroundHeadings />
                        <div className="relative max-w-full z-10 pt-section-xs">
                            <GallerySliderClient galleries={galleriesRes.docs} />
                        </div>
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default GallerySliderBlock;
