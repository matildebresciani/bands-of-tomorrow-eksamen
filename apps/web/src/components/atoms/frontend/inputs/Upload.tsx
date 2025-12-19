import { cn } from '@/lib/utilities/ui';
import { useId, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldBase from './FieldBase';

interface Props {
    label: string;
    name: string;
    isRequired?: boolean;
    buttonLabel?: string;
    placeholder?: string;
    maxFiles?: string | null;
}
const UploadField = ({ label, name, isRequired, buttonLabel, placeholder, maxFiles }: Props) => {
    const { register, formState, watch, setValue } = useFormContext();
    const error = formState.errors[name];

    const errorId = useId();
    const id = useId();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const files = watch(name) as FileList | undefined;
    const hasFiles = files && files.length > 0;

    const { ref: rhfRef, ...rhfRegister } = register(name, { required: isRequired });

    const handleFileChange = (fileList: FileList | null) => {
        if (!fileList) return;
        const newFiles = Array.from(fileList);
        const currentFiles = files ? Array.from(files) : [];
        const uniqueNewFiles = newFiles.filter(
            (newFile) => !currentFiles.some((f) => f.name === newFile.name && f.size === newFile.size),
        );
        const mergedFiles = [...currentFiles, ...uniqueNewFiles];
        const dataTransfer = new DataTransfer();
        mergedFiles.forEach((file) => dataTransfer.items.add(file));
        setValue(name, dataTransfer.files, { shouldValidate: true });
    };

    return (
        <FieldBase label={label} isRequired={isRequired} error={error} inputId={id} errorId={errorId}>
            <input
                type="file"
                id={id}
                multiple
                {...rhfRegister}
                ref={(e) => {
                    rhfRef(e);
                    inputRef.current = e;
                }}
                className="hidden"
                aria-labelledby={`${name}-label`}
            />
            <label
                htmlFor={name}
                onClick={(e) => e.preventDefault()}
                role="presentation"
                onKeyUp={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        inputRef.current?.click();
                    }
                }}
                aria-label={label}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragActive(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragActive(false);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragActive(false);
                    handleFileChange(e.dataTransfer.files);
                }}
                className={cn(
                    'flex flex-col items-center justify-center space-y-s w-full min-h-[200px] bg-input-bg',
                    'py-m px-s text-center',
                    'border border-dashed transition-colors',
                    error ? 'border-red-500' : isDragActive ? 'bg-input-subtle' : 'bg-input-bg border-input-border',
                    hasFiles && !error ? 'bg-input-bg' : '',
                )}
            >
                {hasFiles ? (
                    <div className="flex flex-col items-center justify-center w-full space-y-6">
                        <ul className="list-none p-0 m-0 w-full max-w-sm max-h-32 overflow-y-auto space-y-2 text-center">
                            {Array.from(files).map((file) => (
                                <li
                                    key={file.name + file.size}
                                    className="text-sm flex items-center justify-center gap-2"
                                >
                                    <span className="truncate">{file.name}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col items-center w-full mt-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    inputRef.current?.click();
                                }}
                                className={cn(
                                    'flex items-center justify-center gap-4 border p-s transition-colors duration-200 cursor-pointer hover:bg-button-subtle body-md',
                                    'border-border-base bg-button-subtle hover:bg-button-subtle/80',
                                )}
                            >
                                {buttonLabel || 'Tilføj flere'}
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const dt = new DataTransfer();
                                    setValue(name, dt.files, { shouldValidate: true });
                                }}
                                className="text-red-500 hover:text-red-700 text-sm font-medium p-2"
                            >
                                Fjern alle
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-body-sm text-center italic font-light placeholder-text">
                            {placeholder || 'Upload filer ved at hive dem ind i dette vindue eller tryk på knappen'}
                        </p>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                inputRef.current?.click();
                            }}
                            className={cn(
                                'flex items-center justify-center gap-4 border p-s transition-colors duration-200 cursor-pointer hover:bg-button-subtle body-md',
                                'border-border-base bg-button-subtle hover:bg-button-subtle/80',
                            )}
                        >
                            {buttonLabel || 'Upload filer'}
                        </button>
                    </>
                )}
            </label>
        </FieldBase>
    );
};

export default UploadField;
