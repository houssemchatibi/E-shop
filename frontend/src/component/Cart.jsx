import React, { useState } from 'react';

const Cart = ({ cartItems, updateQuantity, placeOrder }) => {

  const [total, setTotal] = useState(0);

  // Define calculateTotalPrice function
  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    placeOrder(cartItems);
  };

  return (
    <div>

      <div className="card mb-3 my-5" style={{ width: '700px' }}>
        <div className="row g-0">

          <div className="col-md-8">
            {cartItems.map((item) => (
              <div className="card-body text-center">

                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Quantity: {item.quantity}{' '}
                  <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>{' '}
                  <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                </p>
                <p className="card-text">Quantity: {item.quantity}{' '}  </p>
              </div>
            ))}

            <p>Total Price: {calculateTotalPrice()}</p>

            <button className="btn btn-warning" onClick={handlePlaceOrder}
            >Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
