'use client';
import type { Navigation } from '@/payload-types';
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui';

export const RowLabel: React.FC<RowLabelProps> = () => {
    const data = useRowLabel<NonNullable<Navigation['navItems']>[number]>();

    const label = data?.data?.link?.label
        ? `Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
        : 'Link';

    return <div>{label}</div>;
};
