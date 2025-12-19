import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { payloadConditionalLink, payloadLink, payloadLinkInner } from '@/lib/field-templates/links';
import { payloadTranslationField } from '@/lib/field-templates/translation';
import type { GlobalConfig } from 'payload';
import { changeHomepage } from './hooks/change-homepage';
import { revalidateGlobalOptions } from './hooks/revalidate-options';

export const Options: GlobalConfig = {
    slug: 'options',
    admin: {
        group: 'Tools & Settings',
    },
    access: {
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Global Content',
                    fields: [
                        {
                            label: 'Set Homepage',
                            name: 'defaultPages',
                            type: 'group',
                            localized: true,
                            fields: [
                                {
                                    type: 'relationship',
                                    label: 'Choose Homepage',
                                    name: 'homepage',
                                    relationTo: 'pages',
                                    required: true,
                                },
                            ],
                        },
                        {
                            label: 'Company Details',
                            name: 'companyDetails',
                            type: 'group',
                            localized: true,
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'companyName',
                                            label: 'Company Name',
                                            type: 'text',
                                        },
                                        {
                                            name: 'vatNumber',
                                            label: 'VAT (CVR)',
                                            type: 'text',
                                        },
                                    ],
                                },
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'address',
                                            label: 'Address',
                                            type: 'text',
                                        },
                                        {
                                            name: 'city',
                                            label: 'Zip & City',
                                            type: 'text',
                                        },
                                    ],
                                },
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'email',
                                            label: 'E-mail',
                                            type: 'email',
                                        },
                                        {
                                            name: 'phone',
                                            label: 'Phone Number',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: 'socialLinks',
                            label: 'Social Links',
                            type: 'array',
                            localized: true,
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'platform',
                                            type: 'select',
                                            options: [
                                                'Facebook',
                                                'LinkedIn',
                                                'YouTube',
                                                'Twitter',
                                                'Instagram',
                                                'TikTok',
                                                'Snapchat',
                                                'Pinterest',
                                                'Reddit',
                                                'Discord',
                                                'Twitch',
                                                'Threads',
                                                'WhatsApp',
                                                'Telegram',
                                            ],
                                        },
                                        {
                                            name: 'link',
                                            label: 'Link',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Translations',
                    fields: [
                        {
                            type: 'group',
                            name: 'translations',
                            label: 'Translations',
                            fields: [
                                payloadTranslationField({
                                    name: 'tlCopyright',
                                    label: 'Copyright',
                                    defaultValue: '© All rights reserved.',
                                }),
                            ],
                        },
                    ],
                },
                {
                    label: 'SEO',
                    fields: [
                        {
                            name: 'indexing',
                            type: 'group',
                            admin: {
                                description:
                                    'IMPORTANT! Unchecking this will remove the site from all organic listings on Google.',
                            },
                            fields: [
                                {
                                    name: 'siteIndexable',
                                    label: 'Is Site Indexable?',
                                    type: 'checkbox',
                                    defaultValue: true,
                                },
                            ],
                        },
                        {
                            name: 'meta',
                            type: 'group',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'metaTitlePrefix',
                                            label: 'Default Meta Title Prefix',
                                            type: 'text',
                                            localized: true,
                                        },
                                        {
                                            name: 'metaTitleSuffix',
                                            label: 'Default Meta Title Suffix',
                                            type: 'text',
                                            localized: true,
                                        },
                                    ],
                                },
                                {
                                    name: 'defaultImage',
                                    label: 'Default OG Share Image',
                                    type: 'upload',
                                    relationTo: 'media',
                                },
                            ],
                        },
                        {
                            name: 'structuredData',
                            type: 'group',
                            fields: [
                                {
                                    name: 'structuredData',
                                    label: 'Global Structured Data',
                                    type: 'code',
                                    defaultValue: '',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Scripts',
                    fields: [
                        {
                            name: 'scriptInjection',
                            label: 'Script Injection',
                            type: 'group',
                            admin: {
                                description:
                                    'Be careful. Scripts have a direct influence on how the site performs. Only edit this page, if you know what you are doing.',
                            },
                            fields: [
                                {
                                    name: 'headScript',
                                    type: 'code',
                                    label: 'Scripts in <head>',
                                    defaultValue: '',
                                },
                                {
                                    name: 'bodyScript',
                                    type: 'code',
                                    label: 'Scripts in opening <body>',
                                    defaultValue: '',
                                },
                                {
                                    name: 'footerScript',
                                    type: 'code',
                                    label: 'Scripts in closing </body>',
                                    defaultValue: '',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        payloadConditionalLink({ name: 'linkTypeTemplate' }),
    ],
    hooks: {
        afterChange: [changeHomepage, revalidateGlobalOptions],
    },
};
