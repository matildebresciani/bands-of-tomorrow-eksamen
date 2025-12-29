type Props = {
    active?: boolean;
    onClick?: () => void;
};

const PaginationBullet = ({ active, onClick }: Props) => {
    return (
        <button
            type="button"
            aria-label="pagination bullet button"
            onClick={onClick}
            aria-current={active ? 'true' : undefined}
            className="flex items-center justify-center w-6 h-6 cursor-pointer"
        >
            <span
                className={`
                    block rounded-full transition-all
                    w-4 h-4 border border-button-primary
                    ${active ? 'bg-button-primary' : 'bg-transparent'}
                `}
            />
        </button>
    );
};

export default PaginationBullet;
