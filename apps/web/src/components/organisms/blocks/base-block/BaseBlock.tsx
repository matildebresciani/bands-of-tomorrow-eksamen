import { cn } from '@/lib/utilities/ui';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    className?: string;
    classNameOuter?: string;
}>;

const BaseBlock = ({ className, classNameOuter, children }: Props) => {
    return (
        <section className={cn('base-block-outer pb-section-xs md:pb-section-m bg-bg-base', classNameOuter)}>
            <div className={cn('base-block', className)}>{children}</div>
        </section>
    );
};

export default BaseBlock;
