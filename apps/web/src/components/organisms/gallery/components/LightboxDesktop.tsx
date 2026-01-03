import PaginationButton from '@/components/atoms/frontend/buttons/PaginationButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { LightboxProps } from '../lightbox-types';

type Props = LightboxProps;

const LightboxDesktop = ({ images, activeIndex, onClose, onNext, onPrev }: Props) => {
    const activeImage = images[activeIndex];

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            aria-modal="true"
            tabIndex={-1}
            onClick={onClose}
            onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
            }}
        >
            <div
                className="relative max-w-5xl max-h-full flex items-center"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <PaginationButton action="prev" onClick={onPrev} className="absolute left-[-70px]" />

                <ImageMedia resource={activeImage} priority imgClassName="w-auto h-auto max-h-[90vh]" size="100vw" />

                <PaginationButton action="next" onClick={onNext} className="absolute right-[-70px]" />
            </div>
        </div>
    );
};

export default LightboxDesktop;
