import RichText from '@/components/molecules/admin/RichText';
import Accordion from '@/components/molecules/frontend/Accordion';
import { initPayload } from '@/lib/config';
import { getCachedEntryById } from '@/lib/data/payload/get-cached-entry-by-id';
import type { BC } from '@/lib/types/block-props';
import type { FAQ as FaqBlockProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const FaqBlock: BC<FaqBlockProps> = async ({ block, locale }) => {
    const { heading, faqs } = block;

    const faqIds = faqs?.map((faq) => (typeof faq === 'string' ? faq : faq.id)) ?? [];

    const payload = await initPayload();

    const fetchedFaqs = await payload.find({
        collection: 'faqs',
        where: {
            id: { in: faqIds },
        },
        limit: 0,
    });

    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                    <h3 className="text-center uppercase">{heading}</h3>

                    {fetchedFaqs?.docs.map((faq) => (
                        <Accordion title={faq.question} key={faq.id}>
                            {faq.answer && <RichText data={faq.answer} />}
                        </Accordion>
                    ))}
                </div>
            </div>
        </BaseBlock>
    );
};

export default FaqBlock;
