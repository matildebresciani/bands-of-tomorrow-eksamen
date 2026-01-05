'use client';
import { cn } from '@/lib/utilities/ui';
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
        variant === 'tertiary' &&
            'text-fg-highlight-2 transition-transform duration-300 hover:scale-120 hover:underline',
        className,
    );

    const content = children ?? title;

    if (type === 'link' && href) {
        return (
            <Link href={href} className={style} target={openNewTab ? '_blank' : '_self'} onClick={() => onClick?.()}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type && type !== 'link' ? type : 'button'}
            className={style}
            onClick={() => onClick?.()}
            disabled={disabled}
        >
            {content}
        </button>
    );
};

export default BaseButton;
