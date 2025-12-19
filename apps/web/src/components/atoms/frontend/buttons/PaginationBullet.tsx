type Props = {
    active?: boolean;
    onClick?: () => void;
};

const PaginationBullet = ({ active, onClick }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                w-3 h-3 rounded-full transition-all border border-button-primary cursor-pointer
                ${active ? 'bg-button-primary' : 'bg-transparent'}
            `}
        />
    );
};

export default PaginationBullet;
