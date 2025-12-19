import { revalidateTag } from 'next/cache';

export const revalidateNavigation = () => {
    revalidateTag('navigation');
};
