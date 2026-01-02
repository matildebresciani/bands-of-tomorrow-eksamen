import { Heading } from '@/components/atoms/frontend/heading/Heading';
import CardSlider from '@/components/molecules/frontend/CardSlider';
import { initPayload } from '@/lib/config';
import type { BC } from '@/lib/types/block-props';
import type { GallerySlider as GallerySliderProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';
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
                    <Heading level={2} className="mb-section-xxs uppercase">
                        Gallerier
                    </Heading>

                    <div className="relative max-w-full">
                        <GallerySliderClient galleries={galleriesRes.docs} />
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default GallerySliderBlock;
