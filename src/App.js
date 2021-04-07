import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./actions/authAction";

import Home from "./pages/Home/Home";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import Auth from "./pages/Auth/Auth";

import { CssBaseline } from "@material-ui/core";
import PrivateRoute from "./components/PrivateRoute";
import history from "./util/history";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      console.log("Checking");
      dispatch(isLoggedIn());
    }
  }, [auth.authenticated, dispatch]);

  console.log(auth.authenticated);

  return (
    <div className="App">
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/create" component={CreateOrder} />
          <Route exact path="/auth" component={Auth} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
