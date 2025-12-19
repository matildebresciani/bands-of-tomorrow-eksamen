import FormError from './FormError';
import Required from './Required';

type Props = {
    label: string;
    isRequired?: boolean;
    error?: Record<string, unknown>;
    children: React.ReactNode;
    inputId?: string;
    errorId?: string;
};

const FieldBase = ({ label, isRequired, error, children, inputId, errorId }: Props) => {
    return (
        <div className="flex flex-col space-y-xs">
            <label htmlFor={inputId} className="font-semibold text-sm">
                {label}
                {isRequired && <Required />}
            </label>
            {children}
            {error && <FormError error={error} id={errorId} />}
        </div>
    );
};

export default FieldBase;
