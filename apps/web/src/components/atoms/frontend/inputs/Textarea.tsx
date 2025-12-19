import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldBase from './FieldBase';

type Props = {
    label: string;
    name: string;
    placeholder?: string;
    isRequired?: boolean;
};

const Textarea = ({ label, name, placeholder, isRequired }: Props) => {
    const { register, formState } = useFormContext();
    const error = formState.errors[name];

    const errorId = useId();
    const id = useId();

    return (
        <FieldBase label={label} isRequired={isRequired} error={error} inputId={id} errorId={errorId}>
            <textarea
                {...register(name, { required: isRequired })}
                placeholder={placeholder}
                id={id}
                className="py-m px-s border border-border-base bg-input-bg placeholder-text"
                aria-invalid={!!error}
                aria-errormessage={error ? errorId : undefined}
            />
        </FieldBase>
    );
};

export default Textarea;
