type RoleCarrier = {
    userRole?: string | null;
};

export const hasUserRole = (user: unknown, role: string) => {
    if (typeof user !== 'object' || user === null) return false;

    const maybeUser = user as RoleCarrier;
    return maybeUser.userRole === role;
};

export const hasAdminRole = (user: unknown) => hasUserRole(user, 'admin');
export const hasEditorRole = (user: unknown) => hasUserRole(user, 'editor');
