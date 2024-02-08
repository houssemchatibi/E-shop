import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";



const Register = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    const usernameError = document.querySelector(".username.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    
    passwordConfirmError.innerHTML = "";
    

    if (password !== controlPassword) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

    } else {
      await axios({
        method: "post",
        url: `http://localhost:3000/api/auth/register`,
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            usernameError.innerHTML = res.data.errors.username;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
            
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Navigate to="/login" />
         
        </>
      ) : (
        <div className="wrapper">
        <form action="" onSubmit={handleRegister} id="sign-up-form" className="form-signin">
          <label htmlFor="username">username</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            onChange={(e) => setusername(e.target.value)}
            value={username}
          />
          <div className="username error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br/>
          <input
            type="password"
            name="password"
            id="password-conf"
            className="form-control"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <div className="d-flex justify-content-center">
          <input type="submit" className="btn btn-lg btn-primary btn-block justify-content-center" value="Valider inscription" />
          </div>
        </form>
        </div>
      )}
    </>
  );
};

export default Register;