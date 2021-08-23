import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

import Home from "./components/Home";

const Todo = lazy(() => import("./components/Todo"));
const Feed = lazy(() => import("./components/Feed"));
const Feed2 = lazy(() => import("./components/Feed2"));

function App() {
  return (
    <Router>
      <div style={{ width: "700px" }} className="mx-auto">
       
        <nav
          style={{ width: "200px", height: "100vh", top: "20px" }}
          className="position-fixed"
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/feeds">Feeds</Link>
            </li>
            <li>
              <Link to="/feeds2">Feeds2</Link>
            </li>
          </ul>
        </nav>
        <main style={{ marginLeft: "200px", marginTop: "20px" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>

              <Route path="/" component={Home} exact />
              <Route path="/todo" component={Todo} />
              <Route path="/feeds" component={Feed} />
              <Route path="/feeds2" component={Feed2} />

            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;