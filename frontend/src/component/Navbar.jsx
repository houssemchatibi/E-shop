import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UidContext } from "./AppContext";
import Logout from './Logout';


const Navbar = () => {

  const uid = useContext(UidContext);
  
  return (
    <>
      <header className='sticky-top'>

        {uid ? (
          <div className="nav-bar">
            <Link to={'/'} className="brand">E-shop</Link>
            <div>
            <Link to={'/cart'} className="cart">Cart</Link>
            
            <Logout/>
             
            </div>
          </div>
              ) : (
                <div className="nav-bar">
            <Link to={'/'} className="brand">E-shop</Link>
            <div>
            <Link to={'/cart'} className="cart">Cart</Link>
              <Link to={'/login'} className="login">Login</Link>
            </div>
          </div>
        )}

</header>
    </>


  )
}

export default Navbar
