import React from "react";
import { Redirect, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Layout>
      <Route
        {...rest}
        component={(props) => {
          const user =
            localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user"));
          console.log(props);
          if (user) {
            return <Component {...props} />;
          } else {
            return <Redirect to={"/auth"} />;
          }
        }}
      />
    </Layout>
  );
};

export default PrivateRoute;
