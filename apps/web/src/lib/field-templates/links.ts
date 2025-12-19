import { routedCollections } from '@/i18n/localized-collections';
import type { Field } from 'payload';
import type { PayloadLinkProps } from './types/field-template-types';

export const payloadTitleLink = (localized = true, required = true): Field => {
    return {
        type: 'text',
        name: 'label',
        label: 'Label',
        admin: {
            width: '50%',
        },
        localized,
        required,
    };
};

export const payloadTypeLink = (localized = true): Field => {
    return {
        type: 'radio',
        name: 'type',
        localized,
        required: true,
        admin: {
            layout: 'horizontal',
            width: '50%',
        },
        defaultValue: 'reference',
        options: [
            {
                label: 'Internal link',
                value: 'reference',
            },
            {
                label: 'Custom URL',
                value: 'custom',
            },
        ],
    };
};

export const payloadTargetLink = (localized = true): Field => {
    return {
        type: 'checkbox',
        name: 'openNewTab',
        label: 'Open new tab',
        localized,
        admin: {
            width: '50%',
            style: {
                alignSelf: 'flex-end',
            },
        },
    };
};

export const payloadUrlLink = (localized = true, required = true): Field => {
    return {
        type: 'text',
        name: 'url',
        label: 'URL',
        localized,
        required,
        admin: {
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'custom',
            width: '50%',
        },
    };
};

export const payloadRelationshipLink = (localized = true, required = true): Field => {
    return {
        type: 'relationship',
        name: 'relation',
        label: 'Link To',
        relationTo: [...routedCollections],
        localized,
        required,
        admin: {
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'reference',
            width: '50%',
        },
    };
};

export const payloadLinkInner = (props: PayloadLinkProps = {}): Field => {
    const { required = true, localized = true, name = 'link', label = 'Link' } = props;

    return {
        type: 'group',
        name,
        label,
        admin: {
            hideGutter: true,
        },
        fields: [
            {
                type: 'row',
                fields: [payloadTypeLink(localized), payloadTargetLink(localized)],
            },
            {
                type: 'row',
                fields: [
                    payloadUrlLink(localized, required),
                    payloadRelationshipLink(localized, required),
                    payloadTitleLink(localized, required),
                ],
            },
        ],
    };
};

export const payloadLink = (props: PayloadLinkProps = {}): Field => {
    const { required = true, localized = true, name = 'link', label = 'Link', admin } = props;

    return {
        type: 'collapsible',
        label,
        fields: [payloadLinkInner({ required, localized, name, label, admin })],
    };
};

export const payloadAddLink: Field = {
    type: 'checkbox',
    name: 'addLink',
    label: 'Add Link',
    localized: true,
};

export const payloadConditionalLink = (props: PayloadLinkProps = {}): Field => {
    const { required = true, localized = true, name = 'link', label = 'Link' } = props;

    return {
        type: 'collapsible',
        label,
        admin: {
            condition: (_: unknown, siblingData: { addLink?: boolean }) => siblingData?.addLink === true,
        },
        fields: [payloadLinkInner({ required, localized, name, label })],
    };
};

export const payloadConditionalLinkCollection = [payloadAddLink, payloadConditionalLink()];

export const payloadWrapperLink = (props: PayloadLinkProps = {}): Field => {
    const { required = true, localized = true, name = 'link', label = 'Link' } = props;

    return {
        type: 'collapsible',
        label,
        fields: [
            {
                type: 'group',
                name,
                label,
                fields: [
                    {
                        type: 'row',
                        fields: [payloadTypeLink(localized), payloadTargetLink(localized)],
                    },
                    payloadUrlLink(localized, required),
                    payloadRelationshipLink(localized, required),
                ],
            },
        ],
    };
};
