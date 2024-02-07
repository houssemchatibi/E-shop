import React, { useState } from 'react';
import Navbar from './component/Navbar'
import Product from './component/Product'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import DetailProduct from './component/DetailProduct'
import Cart from './component/Cart'
const App = () => {


  const [cartItems, setCartItems] = useState([]);


  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.product_id === product.product_id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };


  const placeOrder = async () => {
    try {
    
      const totalPrice = calculateTotalPrice(cartItems);

      const commandResponse = await fetch('http://localhost:3000/api/commande/addCommande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, 
          total_price: totalPrice > 100 ? totalPrice * 0.75 : totalPrice, 
        }),
      });

      if (!commandResponse.ok) {
        throw new Error('Failed to add command');
      }

      const commandData = await commandResponse.json();
      const commandId = commandData.id; 

      for (const item of cartItems) {
        const detailResponse = await fetch('http://localhost:3000/api/detailCommande/addDetailCommande', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: commandId,
            product_id: item.product_id,
            quantity: item.quantity,
          }),
        });

        if (!detailResponse.ok) {
          throw new Error('Failed to add detail to command');
        }
      }
    // Vider le cartItems après avoir passé la commande
    setCartItems([]);
      console.log('Order placed successfully');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/product/:id" element={<DetailProduct productId={1} addToCart={addToCart}/>} />
      <Route path="/cart" element={<Cart  cartItems={cartItems} updateQuantity={updateQuantity} placeOrder={placeOrder}/>} />
    </Routes>
    </Router>      
    </>
  )
}

export default App
