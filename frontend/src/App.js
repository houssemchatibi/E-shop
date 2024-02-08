import React, { useState,useEffect } from 'react';
import Navbar from './component/Navbar'
import Product from './component/Product'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { UidContext } from "./component/AppContext";
import axios from "axios";
import DetailProduct from './component/DetailProduct'
import Cart from './component/Cart'
import Login from './component/Login';
import Register from './component/Register';

const App = () => {


  const [cartItems, setCartItems] = useState([]);
  const [uid, setUid] = useState(null);
  const [tokenRequested, setTokenRequested] = useState(false);

  useEffect(() => {
    if (!tokenRequested) { // Vérifie si la requête a déjà été envoyée
      const fetchToken = async () => {
        try {
          const response = await axios.get('http://localhost:3000/jwtid', { withCredentials: true });
          console.log(response.data)
          setUid(response.data);
          setTokenRequested(true); // Met à jour la variable d'état pour indiquer que la requête a été envoyée
        } catch (error) {
          console.log('Error fetching token:', error);
        }
      };
      fetchToken();
    }
  }, [uid, tokenRequested]);

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
    <UidContext.Provider value={uid}>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Product />} />
      <Route path="/product/:id" element={<DetailProduct productId={1} addToCart={addToCart}/>} />
      <Route path="/cart" element={<Cart  cartItems={cartItems} updateQuantity={updateQuantity} placeOrder={placeOrder}/>} />
    </Routes>
    </Router>      
    </UidContext.Provider>
    </>
  )
}

export default App
