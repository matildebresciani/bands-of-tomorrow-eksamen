'use client';
import { cn } from '@/lib/utilities/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
    action: 'prev' | 'next';
    className?: string;
    onClick?: () => void;
};

const PaginationButton = ({ action, className, onClick }: Props) => {
    const style = cn(
        'size-[50px] flex justify-center items-center bg-button-secondary text-fg-on-color border border-bg-base cursor-pointer',
        className,
    );

    return (
        <button type="button" className={style} onClick={() => onClick?.()}>
            {action === 'prev' && <ArrowLeft />}
            {action === 'next' && <ArrowRight />}
        </button>
    );
};

export default PaginationButton;
