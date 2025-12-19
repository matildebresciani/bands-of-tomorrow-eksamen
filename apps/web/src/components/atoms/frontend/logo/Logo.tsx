import { cn } from '@/lib/utilities/ui';
import Image from 'next/image';
import type { FC } from 'react';

type Props = {
    variant?: 'full' | 'icon';
    className?: string;
};
const Logo = ({ variant = 'icon', className }: Props) => {
    const src = variant === 'full' ? '/images/svgs/logo-big.svg' : '/images/svgs/logo-small.svg'; // kun B’et

    return (
        <Image
            src={src}
            alt={variant === 'full' ? 'Bands of Tomorrow logo' : 'Bands of Tomorrow icon'}
            width={variant === 'full' ? 1620 : 78}
            height={variant === 'full' ? 242 : 61}
            className={cn(className)}
        />
    );
};

export default Logo;
