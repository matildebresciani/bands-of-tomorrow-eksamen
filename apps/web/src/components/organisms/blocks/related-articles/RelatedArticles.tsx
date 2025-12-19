import CardSlider from '@/components/molecules/frontend/CardSlider';
import { initPayload } from '@/lib/config';
import { getCachedEntryById } from '@/lib/data/payload/get-cached-entry-by-id';
import type { BC } from '@/lib/types/block-props';
import type { Article, RelatedArticles as RelatedArticlesProps } from '@/payload-types';
import BaseBlock from '../base-block/BaseBlock';

const RelatedArticlesBlock: BC<RelatedArticlesProps> = async ({ block, locale, pageId }) => {
    const { heading } = block;

    //Henter data for den aktuelle artikel
    const articleData = await getCachedEntryById({
        collection: 'articles',
        id: pageId,
        locale,
    });

    const raw = articleData?.relatedArticles ?? [];

    // Hent de relaterede artikler baseret på deres ID'er
    const ids = raw.map((item) => (typeof item === 'string' ? item : item.id));

    const payload = await initPayload();

    let relatedArticles: Article[] = [];

    if (ids.length > 0) {
        const { docs } = await payload.find({
            collection: 'articles',
            where: { id: { in: ids } },
            locale,
            limit: ids.length,
        });
        relatedArticles = docs;
    }

    //Fallback logik
    if (relatedArticles.length === 0) {
        const currentType = articleData?.articleType;

        const { docs } = await payload.find({
            collection: 'articles',
            where: {
                and: [{ articleType: { equals: currentType } }, { id: { not_equals: pageId } }],
            },
            limit: 10,
            locale,
        });

        relatedArticles = docs;
    }
    return (
        <BaseBlock classNameOuter="overflow-hidden">
            <div className="oakgrid">
                <div className="col-span-12">
                    <h3 className="mb-section-xxs uppercase">{heading}</h3>
                    <div className="relative max-w-full">
                        {relatedArticles.length > 0 ? (
                            <CardSlider articles={relatedArticles} />
                        ) : (
                            <span>Ingen relaterede artikler fundet.</span>
                        )}
                    </div>
                </div>
            </div>
        </BaseBlock>
    );
};

export default RelatedArticlesBlock;
