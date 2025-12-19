import { cn } from '@/lib/utilities/ui';
import { cva } from 'class-variance-authority';
import type { FC, JSX } from 'react';

type HeadingProps = {
    level?: 1 | 2;
    size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'sm';
    className?: string;
    children: React.ReactNode;
};

const headingStyles = cva('', {
    variants: {
        type: {
            h1: 'heading-1',
            h2: 'heading-1',
        },
        size: {
            '4xl': 'heading-4xl',
            '3xl': 'heading-3xl',
            '2xl': 'heading-2xl',
            xl: 'text-heading-xl md:text-heading-4xl',
            lg: 'heading-lg',
            sm: 'heading-sm',
        },
    },
    defaultVariants: {
        type: 'h1',
        size: 'xl',
    },
});

export const Heading: FC<HeadingProps> = ({ level = 1, size = 'xl', className, children }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    const styles = headingStyles({
        type: `h${level}`,
        size,
    });

    return (
        <Tag
            className={cn(
                styles,
                className,
                'relative flex z-0 tracking-wider justify-center text-wrap hyphens-auto uppercase text-center',
            )}
        >
            <span className={cn(styles, 'text-logo-red absolute z-1 translate-x-[-.4%] md:translate-x-[-.45%]')}>
                {children}
            </span>
            <span className={cn(styles, 'text-fg-base z-3')}>{children}</span>
            <span className={cn(styles, 'text-logo-blue absolute z-1 translate-x-[.4%] md:translate-x-[.45%]')}>
                {children}
            </span>
        </Tag>
    );
};
