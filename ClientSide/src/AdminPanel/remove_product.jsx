import React, { useState, useEffect } from 'react';

const RemoveProduct = () => {
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

  // Function to handle removing a product
  const removeProduct = async (id, name) => {
    try {
      const response = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name }), // Send the product id and name
      });

      const data = await response.json();
      if (data.success) {
        // Remove the product from the state
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        console.log(`${name} removed successfully`);
      } else {
        console.error('Failed to remove the product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  if (!Array.isArray(products)) {
    return <div className="text-center mt-10 text-red-500">Unexpected data format</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-4 mt-12 mb-12 mx-12">
        {products.map((product) => (
          <div key={product.id} className="w-full">
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
              <button
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeProduct(product.id, product.name)} // Handle product removal
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RemoveProduct;