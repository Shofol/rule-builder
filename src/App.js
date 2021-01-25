// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RuleContainer from './Rules/RuleContainer';
import Pipeline from './Pipeline/Pipeline';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Rule Builder</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/rule">Rules</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pipeline">Pipeline</Link>
                  </li>

                </ul>
              </div>
            </div>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/rule">
              <RuleContainer />
            </Route>
            <Route path="/pipeline">
              <Pipeline />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
