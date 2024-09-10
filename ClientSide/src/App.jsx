import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/cart_page';
import Men from './pages/men_page';
import Women from './pages/women_page';
import Kids from './pages/kids_page';
import ProductPage from './pages/productPage';
import Login from './login/login';
import AddProduct from './AdminPanel/add_product';
import RemoveProduct from './AdminPanel/remove_product';
import Latest from './all_products/AllProducts'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/removeproduct" element={<RemoveProduct />} />
        <Route path="/latest" element={<Latest />} />
      </Routes>
    </Router>
  );
}

export default App;