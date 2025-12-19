import { payloadHeading } from '@/lib/field-templates/headings';
import { payloadConditionalLinkCollection } from '@/lib/field-templates/links';
import { payloadRichText } from '@/lib/field-templates/rich-text';
import type { Block } from 'payload';

export const TextImage: Block = {
    slug: 'text-image',
    interfaceName: 'TextImage',
    imageURL: '/images/block-thumbnails/text-image.png',
    labels: {
        singular: 'TextImage',
        plural: 'TextImages',
    },
    fields: [
        payloadHeading({ required: false }),

        {
            type: 'radio',
            name: 'order',
            label: 'Order',
            required: true,
            defaultValue: 'image-left',
            options: [
                {
                    label: 'Image Left',
                    value: 'image-left',
                },
                {
                    label: 'Image Right',
                    value: 'image-right',
                },
            ],
        },
        {
            type: 'checkbox',
            name: 'addBgColor',
            label: 'Add Background Color',
        },
        {
            type: 'upload',
            name: 'image',
            label: 'Image',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'mode',
            label: 'Image Mode',
            type: 'select',
            required: true,
            defaultValue: 'addImageSingle',
            options: [
                {
                    label: 'Single Image',
                    value: 'addImageSingle',
                },
                {
                    label: 'Duplicated Image',
                    value: 'addImageDuplication',
                },
                {
                    label: 'Card Layout',
                    value: 'addCard',
                },
            ],
        },

        payloadRichText(),
        ...payloadConditionalLinkCollection,
    ],
};
