import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldBase from './FieldBase';

type Props = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    isRequired?: boolean;
};

const Input = ({ label, name, type, placeholder, isRequired }: Props) => {
    const { register, formState } = useFormContext();
    const error = formState.errors[name];

    const errorId = useId();
    const id = useId();

    return (
        <FieldBase label={label} isRequired={isRequired} error={error} inputId={id} errorId={errorId}>
            <input
                type={type}
                {...register(name, { required: isRequired })}
                placeholder={placeholder}
                id={id}
                className="py-xs px-s border border-border-base bg-input-bg placeholder-text"
                aria-invalid={!!error}
                aria-errormessage={error ? errorId : undefined}
            />
        </FieldBase>
    );
};

export default Input;
