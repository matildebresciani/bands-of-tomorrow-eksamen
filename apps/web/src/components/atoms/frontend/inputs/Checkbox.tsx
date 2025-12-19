type Props = {
    checked: boolean;
    onChange: () => void;
    label: string;
};

const Checkbox = ({ checked, onChange, label }: Props) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none body-md">
            <span className="relative inline-block h-6 w-6">
                {/* OUTER BOX */}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="peer h-6 w-6 appearance-none border border-border-base bg-white cursor-pointer"
                />

                {/* INNER SQUARE */}
                <span
                    className={`
                        pointer-events-none absolute inset-0 
                        m-1 h-4 w-4 bg-border-base transition-opacity
                        ${checked ? 'opacity-100' : 'opacity-0'}
                    `}
                />
            </span>

            {label}
        </label>
    );
};

export default Checkbox;
