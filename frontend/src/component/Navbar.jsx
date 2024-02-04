import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
    <header className='sticky-top'>
        <div className="nav-bar">
            <Link to={'/'} className="brand">E-shop</Link>
            <Link to={'/cart'} className="cart">Cart</Link>
        
        </div>
  </header>
    </>

    
  )
}

export default Navbar
