type Props = {
    onClick: () => void;
    label: string;
    active?: boolean;
};

const componentName = ({ onClick, label, active }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`body-md px-s md:px-m py-xs md:py-s border border-border-base cursor-pointer transition-colors duration-200 hover:bg-button-subtle/80 ${active ? 'bg-button-subtle' : 'bg-bg-base'}`}
        >
            {label}
        </button>
    );
};

export default componentName;
