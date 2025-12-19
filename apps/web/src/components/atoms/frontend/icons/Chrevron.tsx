type Props = {
    className?: string;
};

const Chevron = ({ className }: Props) => {
    return (
        <svg
            className={className}
            role="img"
            aria-label="chevron"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9 16L14 11.5L9 7" stroke="#191828" strokeWidth="2" strokeLinecap="square" />
        </svg>
    );
};

export default Chevron;
