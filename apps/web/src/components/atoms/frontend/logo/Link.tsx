import { Link } from '@/i18n/routing';
import Logo from './Logo';

type Props = {
    variant?: 'full' | 'icon';
    className?: string;
};

const LogoLink = ({ variant = 'icon', className }: Props) => {
    return (
        <Link href="/" className="focus:none">
            <Logo variant={variant} className={className} />
        </Link>
    );
};

export default LogoLink;
