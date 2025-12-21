import PaginationBullet from '@/components/atoms/frontend/buttons/PaginationBullet';
import { cn } from '@/lib/utilities/ui';

type Props = {
    totalSlides: number;
    currentSlide: number;
    onBulletClick?: (index: number) => void;
    className?: string;
};

const PaginationBullets = ({ totalSlides, currentSlide, onBulletClick, className }: Props) => {
    return (
        <div className={cn('flex gap-1 justify-center', className)}>
            {Array.from({ length: totalSlides }).map((_, idx) => (
                <PaginationBullet key={idx} active={idx === currentSlide} onClick={() => onBulletClick?.(idx)} />
            ))}
        </div>
    );
};

export default PaginationBullets;
