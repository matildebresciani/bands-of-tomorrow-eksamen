import { motion } from 'motion/react';

type Props = {
    active?: boolean;
    onClick?: () => void;
};

const PaginationBullet = ({ active, onClick }: Props) => {
    return (
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: active ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
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
        </motion.button>
    );
};

export default PaginationBullet;
