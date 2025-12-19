import type { Field, GroupField } from 'payload';
import type { PayloadBaseProps } from './types/field-template-types';

export const payloadFeaturedImage = (props: PayloadBaseProps = {}): Field => {
    const { required = true, localized = true } = props;

    return {
        name: 'featuredImage',
        type: 'upload',
        relationTo: 'media',
    };
};

export const payloadExcerpt = (props: PayloadBaseProps = {}): Field => {
    const { required = true, localized = true } = props;

    return {
        name: 'excerpt',
        type: 'textarea',
    };
};

export const payloadContentExcerpt = (props: PayloadBaseProps = {}): GroupField => {
    const { required = true, localized = true } = props;

    return {
        type: 'group',
        name: 'pageDetails',
        admin: {
            position: 'sidebar',
        },
        localized: true,
        fields: [payloadFeaturedImage(), payloadExcerpt()],
    };
};
