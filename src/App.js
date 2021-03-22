import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Sidebar from './Sidebar';
import UploadCsv from './UploadCsv';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className = "flexbox-container">
          <Sidebar/>        
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
