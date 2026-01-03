import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { LightboxProps } from '../lightbox-types';

type Props = LightboxProps;

const LightboxMobile = ({ images, activeIndex, onClose, setActiveIndex }: Props) => {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            aria-modal="true"
            onClick={onClose}
            onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
            }}
        >
            <div
                className="relative w-full max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Swiper
                    modules={[Navigation, Keyboard]}
                    initialSlide={activeIndex}
                    onSlideChange={(swiper) => setActiveIndex?.(swiper.activeIndex)}
                    keyboard
                    className="h-full w-full"
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id} className="flex items-center justify-center">
                            <ImageMedia resource={image} priority imgClassName="max-h-[90vh] w-auto" size="100vw" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LightboxMobile;
