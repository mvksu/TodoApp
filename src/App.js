import "./App.css";
import ProductList from "./components/ProductList";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

          </ul>
        </nav>

        <Switch>
          <Route exact path="/products/:id/details">
            <ProductDetail />
          </Route>
          <Route exact path="/products">
            <ProductList />
          </Route>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
