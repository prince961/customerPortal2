import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import "./Auth.css";
import { useState } from "react";

const Authentication = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className="">
      {!login ? (
        <Login login={login} setLogin={setLogin} />
      ) : (
        <Register login={setLogin} setLogin={setLogin} />
      )}
    </div>
  );
};

export default Authentication;
