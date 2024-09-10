import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Check if data is logged correctly
        setProducts(Array.isArray(data) ? data : [data]); // Convert to array if necessary
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);  

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  if (!Array.isArray(products)) {
    return <div className="text-center mt-10 text-red-500">Unexpected data format</div>;
  }

  return (
    <>
      <div className="relative w-full h-60 bg-gray-800">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="bg-blue-500 h-20 flex justify-center items-center mt-10">
        <h1 className="text-3xl font-bold text-white">Latest Arrivals</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-4 mt-12 mb-12 mx-12">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="w-full">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 relative w-3/4 mx-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover object-center rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <div className="text-gray-600">
                  <span className="line-through">LKR {product.old_price}</span>
                </div>
                <div className="text-green-600 font-bold">LKR {product.new_price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllProducts;