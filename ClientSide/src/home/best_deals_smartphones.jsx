import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/products/women');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Limit the number of products to display
  const displayedProducts = products.slice(0, 5);

  return (
    <>
      <div className="container mx-auto px-4 mt-20">
        <div className="text-2xl md:text-3xl font-bold text-center underline-custom">
        Shop the Best Deals on <span className="text-blue-custom">Women’s Fashion</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-12 mb-12 mx-12">
        {displayedProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div
              className="bg-white rounded-xl shadow-md border border-gray-200 relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-75 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <div className="text-gray-600">
                  <span className="line-through">LKR{product.old_price}</span>
                </div>
                <div className="text-green-600 font-bold">LKR{product.new_price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mb-12">
        <button className="flex items-center justify-center font-bold text-center bg-transparent border-none" onClick={() => window.location.href = '/women'}>
          <span>View All</span>
          <span className="text-blue-custom ml-2">➜</span>
        </button>
      </div>

      <div className='my-20'>
        <img 
          src="/homePage1.png" 
          alt="Descriptive Alt" 
          className="w-full h-auto max-w-screen-lg mx-auto"
        />
      </div>
    </>
  );
}

export default ProductsList;