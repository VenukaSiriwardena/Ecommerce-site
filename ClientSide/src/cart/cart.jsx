import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching the product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen p-4 md:p-8 bg-gray-900 text-white">
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full md:w-3/4 lg:w-2/3 h-auto rounded-lg object-contain"
                />
            </div>

            {/* Product Details Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-4 md:p-6 space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">{product.name}</h1>
                <p className="text-lg md:text-xl mb-2 line-through">${product.old_price.toFixed(2)}</p>
                <p className="text-xl md:text-2xl lg:text-3xl">${product.new_price.toFixed(2)}</p>

                <div className="w-full space-y-4">
                    {/* Availability */}
                    <div>
                        <span className="font-bold">Availability:</span>
                        <div className="mt-2 h-12 w-28 bg-green-600 flex items-center justify-center rounded">
                            <p className="text-white font-bold">In Stock</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <span className="font-bold">Description:</span>
                        <p className="mt-2 text-sm md:text-base lg:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet faucibus massa. Sed molestie ac leo quis iaculis. Sed ligula velit, gravida ac nisi ac, gravida porttitor nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi et eros nibh. Aenean molestie non orci ac luctus. Donec at suscipit ante, sit amet faucibus lectus.
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded w-full md:w-auto">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;