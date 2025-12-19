import { payloadRichText } from '@/lib/field-templates/rich-text';
import type { Block } from 'payload';

export const Paragraph: Block = {
    slug: 'paragraph',
    interfaceName: 'Paragraph',
    imageURL: '/images/block-thumbnails/paragraph.png',
    labels: {
        singular: 'Paragraph',
        plural: 'Paragraphs',
    },
    fields: [payloadRichText()],
};
