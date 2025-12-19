type Props = {
    className?: string;
};

const Required = ({ className }: Props) => {
    return <span className={`text-red-700 ${className}`}>*</span>;
};

export default Required;
