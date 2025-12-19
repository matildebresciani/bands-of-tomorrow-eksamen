import type { TextField, UIField } from 'payload';

export const productField = () => {
    if (process.env.MEDUSA_API_KEY) {
        const findProductUI: UIField = {
            name: 'chooseExtproduct',
            type: 'ui',
            label: 'Search Medusa Products',
            admin: {
                position: 'sidebar',
                components: {
                    Field: {
                        path: '@/components/molecules/admin/fields/product/ExternalProductComponent#ExternalProductComponent',
                        clientProps: {
                            label: 'Add Product Relation',
                        },
                    },
                },
            },
        };

        const extProductId: TextField = {
            name: 'extProductId',
            type: 'text',
            admin: {
                position: 'sidebar',
                hidden: true, // Hide the actual field since we're managing it through the UI field
            },
        };

        return [findProductUI, extProductId];
    }
    return [];
};
