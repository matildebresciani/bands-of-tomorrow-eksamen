import type { Article } from '@/payload-types';

type Props = {
    label: string | null | undefined;
    type: Article['articleType'];
    reviewType?: Article['reviewType'];
};

const typeColors: Record<string, string> = {
    review: 'bg-label-red text-fg-on-color',
    interview: 'bg-label-dark text-fg-on-color',
    'weekly-releases': 'bg-label-lightblue text-fg-base',
};

const reviewTypeColors: Record<string, string> = {
    concert: 'bg-label-red text-fg-on-color',
    album: 'bg-label-blue text-fg-on-color',
};

const CardLabel = ({ label, type, reviewType }: Props) => {
    const colorStyles =
        type === 'review'
            ? reviewTypeColors[reviewType ?? ''] || typeColors.review
            : typeColors[type] || 'bg-bg-default';

    return (
        //TODO: Baggrundsfarve baseret på artikel type
        <div className={`p-xs flex items-center ${colorStyles}`}>
            <span className="label-text uppercase">{label}</span>
        </div>
    );
};

export default CardLabel;
