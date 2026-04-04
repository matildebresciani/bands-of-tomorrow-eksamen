import { RenderBlocks } from '@/components/organisms/blocks/RenderBlocks';
import { defaultLocale } from '@/i18n/localized-collections';
import { initPayload } from '@/lib/config';
import type { BC } from '@/lib/types/block-props';
import type React from 'react';
import type { ComponentProps } from 'react';

type Blocks = ComponentProps<typeof RenderBlocks>['blocks'];

type SavedLayoutReference = {
    id: string;
    layout?: Blocks | null;
};

type SavedLayoutsBlockProps = {
    savedLayout?: string | SavedLayoutReference | null;
};

const SavedLayoutsBlock: BC<SavedLayoutsBlockProps> = async ({ block, locale = defaultLocale, pageId }) => {
    const selectedLayout = block.savedLayout;
    const savedLayoutId = typeof selectedLayout === 'string' ? selectedLayout : selectedLayout?.id;

    if (!savedLayoutId) return null;

    let resolvedLayout = typeof selectedLayout === 'object' ? selectedLayout : undefined;

    if (!resolvedLayout?.layout) {
        const payload = await initPayload();
        const fetchedLayout = await payload.findByID({
            collection: 'saved-layouts',
            id: savedLayoutId,
            depth: 0,
            locale,
            overrideAccess: false,
        });

        resolvedLayout = fetchedLayout as SavedLayoutReference;
    }

    if (!resolvedLayout?.layout || resolvedLayout.layout.length === 0) return null;

    return <RenderBlocks pageId={pageId} blocks={resolvedLayout.layout} locale={locale} />;
};

export default SavedLayoutsBlock;
