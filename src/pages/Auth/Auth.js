import React, { useState } from "react";
import "./auth.css";
import Login from "./components/Login";
import Register from "./components/Register";
import logistic1 from "./img/logistic1.svg";
import logistic2 from "./img/logistic2.svg";
const Auth = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className={`container ${!login && "sign-up-mode"}`}>
      <div className="forms-container">
        <div className="signin-signup">{login ? <Login /> : <Register />}</div>
      </div>
      <div className="panels-container">
        <div className={`panel left-panel`}>
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              onClick={() => setLogin(!login)}
              className="btn transparent"
            >
              Sign up
            </button>
          </div>
          <img src={login ? logistic1 : logistic2} className="image" alt="" />
        </div>
        <div className={`panel right-panel`}>
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              onClick={() => setLogin(!login)}
              className="btn transparent"
            >
              Login In
            </button>
          </div>
          <img src={login ? logistic1 : logistic2} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
