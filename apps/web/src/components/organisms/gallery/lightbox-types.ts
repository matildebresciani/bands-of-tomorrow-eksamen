import type { Media } from '@/payload-types';

export type LightboxProps = {
    images: Media[];
    activeIndex: number;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    setActiveIndex?: (index: number) => void;
};
