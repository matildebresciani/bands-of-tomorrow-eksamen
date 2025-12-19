import { cn } from '@/lib/utilities/ui';

type Props = {
    className?: string;
};

const PlayIcon = ({ className }: Props) => {
    return (
        <svg
            role="img"
            aria-label="Play icon"
            width="9"
            height="10"
            viewBox="0 0 9 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
        >
            <path d="M8.6875 5.00062L0.161184 9.92329L0.161184 0.0779458L8.6875 5.00062Z" fill="currentColor" />
        </svg>
    );
};

export default PlayIcon;
