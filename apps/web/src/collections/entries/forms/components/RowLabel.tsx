'use client';
import type { DynamicForm } from '@/payload-types';
import { type RowLabelProps, useRowLabel } from '@payloadcms/ui';

export const RowLabel: React.FC<RowLabelProps> = () => {
    const data = useRowLabel<NonNullable<NonNullable<DynamicForm['sections']>[number]['inputs']>[number]>();

    const label = data?.data?.inputLabel
        ? `Input ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.inputLabel}`
        : 'Input';

    return <div>{label}</div>;
};
