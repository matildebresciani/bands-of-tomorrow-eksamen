'use client';
import { cn } from '@/lib/utilities/ui';
import { motion } from 'motion/react';
import Link from 'next/link';

export type BaseButtonProps = {
    type?: 'button' | 'submit' | 'link';
    title?: string;
    href?: string;
    openNewTab?: boolean | null;
    className?: string;
    variant?: 'primary' | 'primaryOnColor' | 'secondary' | 'tertiary';
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
};

const BaseButton = ({
    type,
    title,
    href,
    openNewTab,
    className,
    onClick,
    variant = 'primary',
    children,
    disabled,
}: BaseButtonProps) => {
    const style = cn(
        'inline-flex cursor-pointer w-auto button-text p-xs sm:p-s transition-colors duration-200',
        variant === 'primary' && 'bg-button-primary text-button-text hover:bg-button-primary-hover p-s justify-center',
        variant === 'primaryOnColor' &&
            'bg-button-primary-on-color text-button-text-on-subtle hover:bg-button-primary-on-color-hover p-s justify-center',
        variant === 'secondary' &&
            'bg-button-secondary text-button-text hover:bg-button-secondary-hover p-s justify-center',
        variant === 'tertiary' && 'text-fg-highlight-2 hover:underline',
        className,
    );

    const content = children ?? title;

    const MotionLink = motion.create(Link); //Tilføjer motion animation til <Link>

    if (type === 'link' && href) {
        return (
            <MotionLink
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
                href={href}
                className={style}
                target={openNewTab ? '_blank' : '_self'}
                onClick={() => onClick?.()}
            >
                {content}
            </MotionLink>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            type={type && type !== 'link' ? type : 'button'}
            className={style}
            onClick={() => onClick?.()}
            disabled={disabled}
        >
            {content}
        </motion.button>
    );
};

export default BaseButton;
