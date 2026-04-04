import type { Access } from 'payload';

import { hasAdminRole } from '@/access/hasUserRole';

export const adminOrPublished: Access = ({ req: { user } }) => {
    if (hasAdminRole(user)) {
        return true;
    }

    return {
        publishStatus: {
            equals: 'public',
        },
    };
};
