import Quote from '@/components/molecules/frontend/Quote';
import { initPayload } from '@/lib/config';
import type { BC } from '@/lib/types/block-props';
import type { QuoteSlider as QuoteSliderProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';
import QuoteSliderClient from './QuoteSlider.client';

const QuoteSliderBlock: BC<QuoteSliderProps> = async ({ block, locale }) => {
    const { quotes } = block;

    const quoteIds = quotes?.map((quote) => (typeof quote === 'string' ? quote : quote.id)) || [];

    const payload = await initPayload();
    const fetchedQuotes = await payload.find({
        collection: 'quotes',
        where: {
            id: { in: quoteIds },
        },
        limit: -1,
        locale,
    });

    return (
        <BaseBlock>
            <QuoteSliderClient quotes={fetchedQuotes.docs} />
        </BaseBlock>
    );
};

export default QuoteSliderBlock;
