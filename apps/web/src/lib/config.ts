import configPromise from '@payload-config';
import { getPayload } from 'payload';

export const initPayload = async () => {
    return await getPayload({ config: configPromise });
};
