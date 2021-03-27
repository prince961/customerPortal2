import Navbar from "./shared/Navigation/Navbar";
import Home from "./Home/pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Blog/pages/Create";
import BlogDetails from "./Blog/pages/BlogDetails";
import NotFound from "./shared/components/NotFound";
import Sidebar from "./shared/Navigation/Sidebar";
import UploadCsv from "./shared/util/UploadCsv";

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
                <Create />
              </Route>
              <Route path="/UploadCsv">
                <UploadCsv />
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
