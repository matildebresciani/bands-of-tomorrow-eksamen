import { formatSlug } from '@/components/molecules/admin/fields/slug/formatSlug';
import type { GlobalAfterChangeHook } from 'payload';

export const changeHomepage: GlobalAfterChangeHook = async ({ doc, previousDoc, req: { payload } }) => {
    const previousHomepage = previousDoc.defaultPages?.homepage;
    const currentHomepage = doc.defaultPages?.homepage;

    // Checking if homepage has been changed
    if (previousHomepage !== currentHomepage) {
        if (previousHomepage) {
            // Fetch the old homepage title and prepare a new slug
            const pageTitle = await payload.findByID({
                collection: 'pages',
                id: previousHomepage,
            });
            const slug = formatSlug(pageTitle.title);

            // Add new slug to old homepage
            const addSlug = await payload.update({
                collection: 'pages', // required
                id: previousHomepage, // required
                data: {
                    slug: slug,
                },
            });
        }

        // Remove slug from new homepage (ensures it always links to root path)
        const removeSlug = await payload.update({
            collection: 'pages', // required
            id: currentHomepage, // required
            data: {
                slug: '/',
            },
        });
    }
};
