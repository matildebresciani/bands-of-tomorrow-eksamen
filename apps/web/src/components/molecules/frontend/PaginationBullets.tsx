import PaginationBullet from '@/components/atoms/frontend/buttons/PaginationBullet';

type Props = {
    totalSlides: number;
    currentSlide: number;
    onBulletClick?: (index: number) => void;
};

const PaginationBullets = ({ totalSlides, currentSlide, onBulletClick }: Props) => {
    return (
        <div className="flex gap-xs justify-center">
            {Array.from({ length: totalSlides }).map((_, idx) => (
                <PaginationBullet key={idx} active={idx === currentSlide} onClick={() => onBulletClick?.(idx)} />
            ))}
        </div>
    );
};

export default PaginationBullets;
