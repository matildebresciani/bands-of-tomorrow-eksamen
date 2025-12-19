import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldBase from './FieldBase';

export type SelectOption = {
    label: string;
    value: string;
};

interface Props {
    label: string;
    name: string;
    options: SelectOption[];
    placeholder?: string;
    isRequired?: boolean;
}

const Select = ({ label, name, options, placeholder, isRequired }: Props) => {
    const { register, formState } = useFormContext();
    const error = formState.errors[name];

    const errorId = useId();
    const id = useId();

    return (
        <FieldBase label={label} isRequired={isRequired} error={error} inputId={id} errorId={errorId}>
            <div className="relative w-full">
                <select
                    id={id}
                    {...register(name, { required: isRequired })}
                    className="appearance-none py-xs px-s border border-border-base bg-input-bg w-full pr-10 placeholder-text"
                    defaultValue=""
                    aria-invalid={!!error}
                    aria-errormessage={error ? errorId : undefined}
                >
                    <option value="" disabled hidden className="placeholder-text">
                        {placeholder || 'Vælg en mulighed'}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-4 transform -translate-y-1/2 text-theme-fg-subtle">
                    <ChevronDown />
                </span>
            </div>
        </FieldBase>
    );
};

export default Select;
