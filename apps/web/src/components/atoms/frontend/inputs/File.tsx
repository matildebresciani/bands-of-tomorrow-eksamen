import { X } from 'lucide-react';

type Props = {
    fileName: string;
    onRemove?: () => void;
};

const File = ({ fileName, onRemove }: Props) => {
    return (
        <li className="text-sm flex items-center justify-between gap-2 bg-white p-xs border border-border-base">
            <span className="truncate">{fileName}</span>
            <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove?.();
                }}
            >
                <X />
            </button>
        </li>
    );
};

export default File;
