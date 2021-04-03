import Navbar from "./shared/components/Navigation/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import BlogDetails from "./pages/Blog/BlogDetails";
import NotFound from "./shared/components/NotFound";
import Sidebar from "./shared/components/Navigation/Sidebar";
import Auth from "./pages/Auth/Auth";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="flexbox-container">
          <Sidebar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path={"/auth"}>
                <Auth />
              </Route>
              {/* <div className="container">
                <Route exact path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </div> */}
              {/* <Route exact path="/login" component={Login} />
              <Route path="/register" component={Register} /> */}
              <Route path="/create">
                <CreateOrder />
              </Route>

              <Route path="/blogs/:id">
                <BlogDetails />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
