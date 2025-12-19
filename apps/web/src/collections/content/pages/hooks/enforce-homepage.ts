import type { CollectionBeforeChangeHook } from 'payload';
import type { Page } from '../../../../payload-types';

export const enforceHomepage: CollectionBeforeChangeHook<Page> = async ({ data, req: { payload }, originalDoc }) => {
    const options = await payload.findGlobal({
        slug: 'options',
    });

    let homepageId: string | null = null;

    if (typeof options.defaultPages?.homepage === 'string') {
        homepageId = options.defaultPages.homepage;
    } else if (typeof options.defaultPages?.homepage === 'object') {
        homepageId = options.defaultPages.homepage.id;
    }

    // Ensures always keeping homepage without a slug
    if (homepageId === originalDoc?.id) {
        data.slug = '/';
    }

    return data;
};
