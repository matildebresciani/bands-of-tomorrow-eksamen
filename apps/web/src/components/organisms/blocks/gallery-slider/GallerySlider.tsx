import type { BC } from '@/lib/types/block-props';
import type { GallerySlider as GallerySliderProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const GallerySliderBlock: BC<GallerySliderProps> = ({ block, locale }) => {
    const {} = block;

    return <BaseBlock></BaseBlock>;
};

export default GallerySliderBlock;
