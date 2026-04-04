import type { AccessArgs } from 'payload';

import { hasAdminRole } from '@/access/hasUserRole';
import type { User } from '@/payload-types';

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticatedAndAdmin: isAuthenticated = ({ req: { user } }) => {
    return Boolean(user && user.collection === 'users' && hasAdminRole(user));
};
