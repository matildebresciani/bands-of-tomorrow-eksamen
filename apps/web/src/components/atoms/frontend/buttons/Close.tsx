type Props = {
    onClick: () => void;
};

const Close = ({ onClick }: Props) => {
    return (
        <button type="button" title="Close" aria-label="Close" className="relative h-10 w-10" onClick={() => onClick()}>
            <span className="absolute top-1/2 left-1/2 h-[1px] w-5 bg-black rounded-md -translate-x-1/2 -translate-y-1/2 rotate-45" />
            <span className="absolute top-1/2 left-1/2 h-[1px] w-5 bg-black rounded-md -translate-x-1/2 -translate-y-1/2 -rotate-45" />
        </button>
    );
};

export default Close;
