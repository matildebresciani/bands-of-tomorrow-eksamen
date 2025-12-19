import { revalidateTag } from 'next/cache';

export const revalidateGlobalOptions = () => {
    revalidateTag('global_options');
};
