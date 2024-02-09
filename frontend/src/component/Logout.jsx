import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Link } from 'react-router-dom'

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `http://localhost:3000/api/auth/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
  };

  return (
    
    <Link to={'/'} className="login" onClick={logout} >Logout</Link>
  );
};

export default Logout;
