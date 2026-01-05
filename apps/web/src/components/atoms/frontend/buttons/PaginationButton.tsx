'use client';
import { cn } from '@/lib/utilities/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

type Props = {
    action: 'prev' | 'next';
    className?: string;
    onClick?: () => void;
};

const PaginationButton = ({ action, className, onClick }: Props) => {
    const style = cn(
        'size-[50px] flex justify-center items-center bg-button-secondary text-fg-on-color border border-bg-base cursor-pointer hover:bg-button-secondary-hover',
        className,
    );

    return (
        <motion.button
            whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label="pagination arrow button"
            className={style}
            onClick={() => onClick?.()}
        >
            {action === 'prev' && <ArrowLeft />}
            {action === 'next' && <ArrowRight />}
        </motion.button>
    );
};

export default PaginationButton;
