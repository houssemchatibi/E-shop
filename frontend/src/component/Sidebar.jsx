import React from 'react'
import { useSelector } from "react-redux";

const Sidebar = () => {
    const userData = useSelector((state) => state.userReducer);
  return (
    <div>
    <div className='nounou'>
      <span >Bienvenue {userData.username}</span>
    </div>
  </div>
      )
}

export default Sidebar
