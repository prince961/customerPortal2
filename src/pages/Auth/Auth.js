import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./components/comp.css";

const Authentication = () => {
  return (
    <div className="container">
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
};

export default Authentication;
