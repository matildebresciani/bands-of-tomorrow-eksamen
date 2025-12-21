import { Loader } from 'lucide-react';
import BaseButton, { type BaseButtonProps } from './BaseButton';

type Props = BaseButtonProps & {
    isLoading?: boolean;
    loadingText?: string | null;
};

const LoadingButton = ({ isLoading, loadingText = 'Loading...', title, ...baseButtonProps }: Props) => {
    return (
        <BaseButton {...baseButtonProps} disabled={isLoading}>
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    {loadingText}
                </span>
            ) : (
                title
            )}
        </BaseButton>
    );
};

export default LoadingButton;
