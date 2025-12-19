import { cn } from '@/lib/utilities/ui';
import type { ComponentProps } from 'react';
import type { FieldError } from 'react-hook-form';

type Props = ComponentProps<'span'> & {
    error?: Record<string, unknown> | FieldError;
};

const FormError = ({ error, className, ...rest }: Props) => {
    if (!error) return null;
    return (
        <span {...rest} className={cn('text-red-700 text-sm', className)}>
            {typeof error.message === 'string' ? error.message : 'Feltet er ikke udfyldt korrekt'}
        </span>
    );
};

export default FormError;
