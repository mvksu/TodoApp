import "./App.css";
import ProductList from "./components/ProductList";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";


function App() {
  return (
    <ConfirmProvider>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products/new">Add new product</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route exact path="/">
              <Redirect to="/products" />
            </Route>
          </Switch>
        </div>
      </Router>
    </ConfirmProvider>
  );
}

export default App;
