import type { Block } from 'payload';

const slug = 'saved-layouts';
export const SavedLayoutsBlockConfig: Block = {
    slug,
    interfaceName: 'SavedLayouts',
    labels: {
        singular: 'Saved Layout',
        plural: 'Saved Layouts',
    },
    fields: [
        {
            name: 'savedLayout',
            label: 'Saved Layout',
            type: 'relationship',
            relationTo: 'saved-layouts',
            required: true,
        },
    ],
};
