type Props = {
    isOpen: boolean;
    onClick: (isOpen: boolean) => void;
};

const BurgerButton = ({ isOpen, onClick }: Props) => {
    return (
        <button
            type="button"
            title="Menu"
            className="
                relative flex items-center justify-center
                w-12 h-12   // 48x48px — bedre for finger tap
                cursor-pointer
            "
            onClick={() => onClick(!isOpen)}
        >
            {/* Top line */}
            <span
                className={`
                    absolute top-1/2 left-1/2
                    w-8 h-[3px] rounded
                    bg-black transition-all duration-300
                    -translate-x-1/2
                    ${isOpen ? '-translate-y-0 rotate-45' : '-translate-y-[10px]'}
                `}
            />

            {/* Middle line */}
            <span
                className={`
                    absolute top-1/2 left-1/2
                    w-8 h-[3px] rounded
                    bg-black transition-all duration-300
                    -translate-x-1/2
                    ${isOpen ? 'opacity-0' : 'opacity-100'}
                `}
            />

            {/* Bottom line */}
            <span
                className={`
                    absolute top-1/2 left-1/2
                    w-8 h-[3px] rounded
                    bg-black transition-all duration-300
                    -translate-x-1/2
                    ${isOpen ? '-translate-y-0 -rotate-45' : 'translate-y-[10px]'}
                `}
            />
        </button>
    );
};

export default BurgerButton;
