import './App.css';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Cart from './pages/cart/cart';
import Product from './pages/product/product';
import ProductDetail from './pages/productdetail/productdetail';
import ErrorPage from './pages/error/errorpage';
import PILComponent from './components/pil/pil';
import { useSelector} from "react-redux";
import { useState } from 'react';
import store from "./store/store"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link,
  // useHistory
} from "react-router-dom";
import FooterComponent from './components/footercomponent/footercomponent';

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/products",
    component: Product,
  },
  {
    path: "/productdetail",
    component: ProductDetail,
  },
  {
    path: "/error",
    component: ErrorPage,
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
        
      )}
    />
  );
}

export function App() {
  const [isLoading, setIsLoading] = useState(false)
  // const isLoading = useSelector(state => state.isLoading);
  store.subscribe(() => {
    setIsLoading(store.getState().isLoading)
  });
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                  return (
                      <Redirect to="/home" />
                  )
              }}
            />
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
            
            <Route
              render={() => {
                return (
                    <Redirect to="/error" />
                );
            }}
            />
          </Switch>
        </div>
      </Router>
      <PILComponent isLoading={isLoading}/><PILComponent isLoading={isLoading}/>
      <FooterComponent />
    </div>
  );
}

// export default connect(mapStateToProps)(App);
export default App;
