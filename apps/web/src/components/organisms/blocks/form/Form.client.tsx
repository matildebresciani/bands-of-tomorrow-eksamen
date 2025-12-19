'use client';

import BaseButton from '@/components/atoms/frontend/buttons/BaseButton';
import { generateZodFromForm } from '@/lib/schemas/forms';
import { submitForm } from '@/lib/server/dynamic-form-submit';
import { cn } from '@/lib/utilities/ui';
import type { DynamicForm } from '@/payload-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useTransition } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DynamicFormField from './DynamicFormField';

type FormValues = {
    [key: string]: Record<string, unknown>;
};

type Props = {
    form: DynamicForm;
    layout: 'one-column' | 'two-columns';
};

const FormClient = ({ form, layout }: Props) => {
    const [isPending, startTransition] = useTransition();

    const dynamicSchema = useMemo(() => generateZodFromForm(form?.sections), [form]);

    const methods = useForm({ resolver: zodResolver(dynamicSchema), mode: 'onBlur' });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // Validate with Zod before building FormData
        const parsedData = dynamicSchema.safeParse(data);
        if (!parsedData.success) {
            // Find first file error and show its message
            const fileError = parsedData.error.errors.find(
                (e) =>
                    (e.path?.length && typeof e.message === 'string' && e.message.includes('Filtypen')) ||
                    e.message?.includes('størrelse') ||
                    e.message?.includes('maksimalt'),
            );
            toast.error(fileError?.message || '');
            return;
        }
        // Build FormData, handling multiple files per key
        const formData = new FormData();
        const parsedValues = parsedData.data as Record<string, unknown>;
        for (const key in parsedValues) {
            const value = parsedValues[key];
            if (value instanceof FileList) {
                Array.from(value).forEach((file) => {
                    formData.append(key, file);
                });
            } else if (typeof value === 'string' || value instanceof Blob) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        }
        startTransition(async () => {
            if (!form || typeof form !== 'object') {
                console.error('Form definition mangler');
                return;
            }
            try {
                await submitForm(formData, form.id);
                toast.success('Din formular er blevet sendt!');

                methods.reset();
                console.log('Formen blev sendt!');
            } catch (error) {
                console.error('Fejl ved afsendelse:', error);
                toast.error('Der opstod en fejl ved afsendelse af formularen. Prøv igen senere.');
            }
        });
    };
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={cn(
                    'grid grid-cols-1 md:grid-cols-subgrid col-span-12 z-10',
                    layout === 'two-columns' && 'md:col-span-6 md:col-start-7',
                    layout === 'one-column' && 'md:col-span-6 md:col-start-4',
                )}
            >
                {form.sections?.map((section, idx) => (
                    <div
                        key={section.sectionTitle || idx}
                        className="col-span-1 md:col-span-6 grid grid-cols-subgrid space-y-m"
                    >
                        {/* {section.sectionTitle && <h5 className="col-span-6 mb-4">{section.sectionTitle}</h5>} */}
                        {section.inputs?.map((field) => {
                            return <DynamicFormField key={field.id} field={field} />;
                        })}
                    </div>
                ))}
                <div
                    className={cn(
                        'flex col-span-12 md:col-span-6 mt-l',
                        layout === 'two-columns' && 'justify-center md:justify-end',
                        layout === 'one-column' && 'justify-center',
                    )}
                >
                    <BaseButton
                        type="submit"
                        variant="secondary"
                        title={form.submitButtonLabel || 'Indsend formular'}
                    />
                </div>
            </form>
        </FormProvider>
    );
};

export default FormClient;
