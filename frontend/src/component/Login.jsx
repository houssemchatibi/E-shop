import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `http://localhost:3000/api/auth/login`,
      withCredentials: true,
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setUsernameError(res.data.errors.username);
          setPasswordError(res.data.errors.password);
        } else {
          // Rediriger l'utilisateur ou effectuer une autre action
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrapper">
      <form action="" onSubmit={handleLogin} className="form-signin">
        <h1 className="form-signin-heading">Login</h1>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <div className="username error">{usernameError}</div>
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
        <div className="password error">{passwordError}</div>
        <br />
        <div className="d-flex justify-content-center">
        <input type="submit" className="btn btn-lg btn-primary btn-block" value="Se connecter" />
        </div>
      </form>
    </div>
  );
};

export default Login;
