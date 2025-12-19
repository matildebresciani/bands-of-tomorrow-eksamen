'use client';
import { FieldLabel, TextInput } from '@payloadcms/ui';
import { useField } from '@payloadcms/ui';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';
import './index.scss';

type Product = {
    id: string;
    title: string;
    subtitle: string;
    handle: string;
    thumbnail: string;
};

type ProductProps = {
    path: string;
    label: string;
};

export const ExternalProductComponent: React.FC<ProductProps> = ({ path, label }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Connect to the extProductId field
    const { value: selectedProductId, setValue: setExtProductId } = useField<string>({
        path: 'extProductId',
    });

    // Fetch specific product when component mounts or selectedProductId changes
    useEffect(() => {
        const fetchSelectedProduct = async () => {
            if (!selectedProductId) {
                setSelectedProduct(null);
                return;
            }

            try {
                const res = await fetch(`/api/medusa/product?id=${selectedProductId}`);
                if (!res.ok) throw new Error('Failed to fetch product');
                const data = await res.json();
                setSelectedProduct(data);
            } catch (err) {
                console.error(err);
                setSelectedProduct(null);
            }
        };

        fetchSelectedProduct();
    }, [selectedProductId]);

    const fetchProducts = async () => {
        if (!searchQuery || searchQuery.length <= 3) return;

        setLoading(true);

        const params = new URLSearchParams({
            q: searchQuery,
            limit: '10',
        }).toString();

        try {
            const res = await fetch(`/api/medusa/search?${params}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // TODO: use react query for this
    // TODO: we can use https://stackoverflow.com/questions/76030996/how-to-use-debounce-with-usequery-in-react-query for debouncing
    // biome-ignore lint/correctness/useExhaustiveDependencies: TODO: fix by moving to react query
    useEffect(() => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 500);

        setDebounceTimeout(timeoutId);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [searchQuery]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectProduct = (product: Product) => {
        setExtProductId(product.id);
        setSelectedProduct(product);
        setIsSearching(false);
        setProducts([]);
        setSearchQuery('');
    };

    const handleRemoveProduct = () => {
        setExtProductId('');
        setSelectedProduct(null);
        setIsSearching(false);
    };

    const handleChangeProduct = () => {
        setIsSearching(true);
    };

    return (
        <div className="field-type product-field-component">
            <FieldLabel htmlFor="field-productQuery" label={label} />

            {selectedProduct && !isSearching ? (
                <div className="selected-product">
                    <div className="selected-product__content">
                        <div className="selected-product__thumbnail">
                            <Image
                                src={selectedProduct.thumbnail ?? '/placeholder-product.png'}
                                height={100}
                                width={100}
                                alt={selectedProduct.title}
                            />
                        </div>
                        <div className="selected-product__details">
                            <div className="selected-product__title">{selectedProduct.title}</div>
                            <div className="selected-product__handle">{selectedProduct.handle}</div>
                            <div className="selected-product__subtitle">{selectedProduct.subtitle}</div>
                        </div>
                    </div>
                    <div className="selected-product__actions">
                        <button type="button" onClick={handleChangeProduct} className="btn btn--change">
                            Change
                        </button>
                        <button type="button" onClick={handleRemoveProduct} className="btn btn--remove">
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <TextInput
                        value={searchQuery}
                        onChange={handleInputChange}
                        path="productQuery"
                        placeholder="Search for products..."
                    />

                    {loading && <div className="loading">Loading...</div>}

                    {products.length > 0 && (
                        <div className="products-list">
                            <ul className="products__result-list">
                                {products.map((product) => (
                                    <li className="result-list__item" key={product.id}>
                                        <button
                                            type="button"
                                            className="item__button"
                                            onClick={() => handleSelectProduct(product)}
                                        >
                                            <div className="item__thumbnail">
                                                <Image
                                                    src={product.thumbnail ?? '/placeholder-product.png'}
                                                    height={200}
                                                    width={200}
                                                    alt={product.title}
                                                />
                                            </div>
                                            <div className="item__details">
                                                <div className="item__title">{product.title}</div>
                                                <div className="item__handle">{product.handle}</div>
                                                <div className="item__subtitle">{product.subtitle}</div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
