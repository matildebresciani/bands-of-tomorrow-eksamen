import Input from '@/components/atoms/frontend/inputs/Input';
import Select from '@/components/atoms/frontend/inputs/Select';
import Textarea from '@/components/atoms/frontend/inputs/Textarea';
import UploadField from '@/components/atoms/frontend/inputs/Upload';
import type { DynamicForm } from '@/payload-types';
import type { JSX } from 'react/jsx-dev-runtime';

type Props = {
    field: NonNullable<NonNullable<DynamicForm['sections']>[number]['inputs']>[number];
};

const getFieldClasses = (field: Props['field']): string => {
    return field.inputWidth === 'full' ? 'col-span-1 md:col-span-6' : 'col-span-1 md:col-span-3';
};

const DynamicFormFieldBase = ({ field }: Props): JSX.Element => {
    const fieldClasses = getFieldClasses(field);
    const isRequired = !!field.isRequired;

    switch (field.inputType) {
        case 'textarea':
            return (
                <div key={field.id} className={fieldClasses}>
                    <Textarea
                        label={field.inputLabel}
                        name={field.inputName}
                        placeholder={field.inputPlaceholder}
                        isRequired={isRequired}
                    />
                </div>
            );

        case 'select':
            return (
                <div key={field.id} className={fieldClasses}>
                    <Select
                        label={field.inputLabel}
                        name={field.inputName}
                        options={field.selectOptions || []}
                        placeholder={field.inputPlaceholder}
                        isRequired={isRequired}
                    />
                </div>
            );
        case 'file':
            return (
                <div key={field.id} className={fieldClasses}>
                    <UploadField
                        label={field.inputLabel}
                        name={field.inputName}
                        isRequired={isRequired}
                        buttonLabel={field.uploadButtonLabel || 'Upload fil'}
                        placeholder={field.inputPlaceholder}
                    />
                </div>
            );
        case 'text':
        case 'email':
        case 'tel':
            return <DefaultField field={field} />;
    }
};

const DefaultField = (props: Props): JSX.Element => {
    const { field } = props;
    const fieldClasses = getFieldClasses(field);
    const isRequired = !!field.isRequired;
    return (
        <div key={field.id} className={fieldClasses}>
            <Input
                type={field.inputType}
                label={field.inputLabel}
                name={field.inputName}
                placeholder={field.inputPlaceholder}
                isRequired={isRequired}
            />
        </div>
    );
};

const DynamicFormField = (props: Props): JSX.Element => {
    const component = <DynamicFormFieldBase {...props} />;
    if (!component) {
        return <DefaultField {...props} />;
    }
    return component;
};

export default DynamicFormField;
