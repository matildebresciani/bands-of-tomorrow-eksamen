import { createCollection } from '@/lib/collection-templates/collection';
import { payloadPublishStatus, payloadPublishedAt } from '@/lib/field-templates/publish-state';

export const Forms = createCollection('dynamic-forms', {
    admin: {
        group: 'Entries',
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishStatus'],
    },
    labels: {
        singular: 'Form',
        plural: 'Forms',
    },

    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true,
        },
        {
            type: 'array',
            name: 'sections',
            label: 'Sections',
            admin: {
                description: 'Add sections to your form. Each section can have a title and multiple input fields.',
            },
            fields: [
                {
                    type: 'text',
                    name: 'sectionTitle',
                    label: 'Section Title',
                    admin: {
                        description: 'Optional title for this section',
                    },
                },
                {
                    type: 'array',
                    name: 'inputs',
                    label: 'Inputs',
                    admin: {
                        components: {
                            RowLabel: '@/collections/entries/forms/components/RowLabel#RowLabel',
                        },
                    },
                    fields: [
                        {
                            type: 'select',
                            name: 'inputType',
                            label: 'Input Type',
                            required: true,
                            defaultValue: 'text',
                            options: [
                                { label: 'Text', value: 'text' },
                                { label: 'Email', value: 'email' },
                                { label: 'Phone', value: 'tel' },
                                { label: 'Textarea', value: 'textarea' },
                                { label: 'Dropdown', value: 'select' },
                                { label: 'Upload', value: 'file' },
                            ],
                        },
                        {
                            type: 'text',
                            name: 'inputName',
                            label: 'Input Name',
                            required: true,
                            validate: (value: any) => {
                                if (!value) return 'Field name is required.';
                                const validNamePattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                                if (!validNamePattern.test(value)) {
                                    return 'Invalid field name syntax. Use only letters, numbers, and underscores, and do not start with a number.';
                                }
                                return true;
                            },
                            admin: {
                                description:
                                    'Must be lowercase and contain no spaces e.g: firstname. Use only letters, numbers, and underscores, and do not start with a number.',
                            },
                        },
                        {
                            type: 'text',
                            name: 'inputLabel',
                            label: 'Input Label',
                            required: true,
                        },
                        {
                            type: 'text',
                            name: 'inputPlaceholder',
                            label: 'Input Placeholder',
                            required: true,
                        },
                        {
                            type: 'select',
                            name: 'inputWidth',
                            label: 'Input Width',
                            required: true,
                            defaultValue: 'full',
                            options: [
                                { label: 'Full Width', value: 'full' },
                                { label: 'Half Width', value: 'half' },
                            ],
                        },
                        {
                            type: 'checkbox',
                            name: 'isRequired',
                            label: 'Is Required',
                        },
                        {
                            type: 'text',
                            name: 'inputErrorMessage',
                            label: 'Input Error Message',
                            defaultValue: 'Dette felt er påkrævet',
                            admin: {
                                condition: (data, siblingData) => !!siblingData.isRequired,
                                description: 'Custom error message to display if validation fails.',
                            },
                        },
                        {
                            type: 'array',
                            name: 'selectOptions',
                            label: 'Select Options',
                            admin: {
                                condition: (data, siblingData) => siblingData.inputType === 'select',
                                description: 'Options for dropdown/select field',
                            },
                            fields: [
                                {
                                    type: 'text',
                                    name: 'label',
                                    label: 'Option Label',
                                    required: true,
                                },
                                {
                                    type: 'text',
                                    name: 'value',
                                    label: 'Option Value',
                                    required: true,
                                    validate: (value: any) => {
                                        if (!value) return 'Field name is required.';
                                        const validNamePattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                                        if (!validNamePattern.test(value)) {
                                            return 'Invalid field name syntax. Use only letters, numbers, and underscores, and do not start with a number.';
                                        }
                                        return true;
                                    },
                                    admin: {
                                        description:
                                            'Must be lowercase and contain no spaces e.g: option_1. Use only letters, numbers, and underscores, and do not start with a number.',
                                    },
                                },
                            ],
                        },
                        {
                            type: 'select',
                            name: 'fileType',
                            label: 'Tilladte filtyper',
                            hasMany: true,
                            admin: {
                                condition: (data, siblingData) => siblingData.inputType === 'file',
                                description: 'Vælg hvilke filtyper der må uploades',
                            },
                            options: [
                                { label: 'Alle', value: 'all' },
                                {
                                    label: 'Billeder (jpg, png, gif, webp)',
                                    value: 'image',
                                },
                                { label: 'PDF', value: 'pdf' },
                                {
                                    label: 'Word (doc, docx)',
                                    value: 'word',
                                },
                                {
                                    label: 'Excel (xls, xlsx)',
                                    value: 'excel',
                                },
                                {
                                    label: 'PowerPoint (ppt, pptx)',
                                    value: 'ppt',
                                },
                                { label: 'Tekst (txt)', value: 'txt' },
                                { label: 'Zip', value: 'zip' },
                            ],
                        },
                        {
                            type: 'text',
                            name: 'uploadButtonLabel',
                            label: 'Button Label',
                            admin: {
                                condition: (data, siblingData) => siblingData.inputType === 'file',
                                description: 'Optional label for the upload button',
                            },
                        },
                    ],
                },
            ],
        },
        {
            type: 'text',
            name: 'submitButtonLabel',
            label: 'Submit Button Tekst',
            defaultValue: 'Indsend',
            admin: {
                description: 'Label for the form submit button',
            },
        },
        {
            type: 'text',
            name: 'recipientEmail',
            label: 'Modtager Email',
            required: false,
            admin: {
                description:
                    'The form will be sent to this email if provided. Otherwise, the company email will be used.',
            },
        },
        {
            type: 'text',
            name: 'emailSubject',
            label: 'Email Subject',
            defaultValue: 'Ny henvendelse fra kontaktformular',
            required: false,
            admin: {
                description: 'Subject line for the form submission email',
            },
        },
        payloadPublishedAt,
        payloadPublishStatus,
    ],
});
