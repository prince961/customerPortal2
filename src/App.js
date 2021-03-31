import Navbar from "./shared/components/Navigation/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import BlogDetails from "./pages/Blog/BlogDetails";
import NotFound from "./shared/components/NotFound";
import Sidebar from "./shared/components/Navigation/Sidebar";

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
