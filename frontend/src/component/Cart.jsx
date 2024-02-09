import React from 'react';
import { useSelector } from "react-redux";

const Cart = ({ cartItems, updateQuantity, placeOrder ,calculateTotalPrice, handleDeleteItem }) => {

  //const [total, setTotal] = useState(0);
  const userData = useSelector((state) => state.userReducer);
  

  const handlePlaceOrder = () => {
    placeOrder(cartItems);
  };

  return (
    <div>
 <div className="row justify-content-center">
      <div className="card mb-3 my-5" style={{ width: '700px' }}>
     

          
            {cartItems.map((item) => (
              <div className="card-body text-center" key={item.product_id}>

                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Quantity: {item.quantity}{' '}
                  <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>{' '}
                  <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                </p>
                <p className="card-text">Quantity: {item.quantity}{' '}  </p>
                <button className="btn btn-danger" onClick={() => handleDeleteItem(item.product_id)}>Supprimer</button>
              </div>
            ))}
            <div className="card-body text-center">
            <p>Total Price: {calculateTotalPrice()}</p>

            <button className="btn btn-warning" onClick={handlePlaceOrder}
            
            >Buy Now</button>
            <h5>Bienvenue {userData.username}</h5>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default Cart
