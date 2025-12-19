import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { BC } from '@/lib/types/block-props';
import { cn } from '@/lib/utilities/ui';
import type { Gallery as GalleryProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const GalleryBlock: BC<GalleryProps> = ({ block }) => {
    const { layout, galleryDescription } = block;

    const images = {
        slot_fullWidth: block.slot_fullWidth,
        slot_left: block.slot_left,
        slot_right: block.slot_right,
        slot_big: block.slot_big,
        slot_wideTop: block.slot_wideTop,
        slot_wideBottom: block.slot_wideBottom,
        slot_top: block.slot_top,
        slot_bottomLeft: block.slot_bottomLeft,
        slot_bottomRight: block.slot_bottomRight,
        slot_a: block.slot_a,
        slot_b: block.slot_b,
        slot_c: block.slot_c,
        slot_topLeft: block.slot_topLeft,
        slot_topCenter: block.slot_topCenter,
        slot_topRight: block.slot_topRight,
        slot_bottom: block.slot_bottom,
    };

    return (
        <BaseBlock classNameOuter="!pb-section-xxs">
            <div className="oakgrid">
                <figure className="col-span-12 md:col-start-2 md:col-span-10">
                    <div className={cn('gallery', `gallery--${layout}`)}>
                        {Object.entries(images).map(([slot, img]) => {
                            if (!img) return null;
                            return (
                                <div key={slot} className={`gallery__item ${slot}`}>
                                    <ImageMedia
                                        resource={img}
                                        className="gallery__img"
                                        fallbackAlt="Foto uden beskrivelse"
                                    />
                                </div>
                            );
                        })}
                    </div>
                    {galleryDescription && (
                        <figcaption className="italic font-light body-sm mt-xs">{galleryDescription}</figcaption>
                    )}
                </figure>
            </div>
        </BaseBlock>
    );
};

export default GalleryBlock;
