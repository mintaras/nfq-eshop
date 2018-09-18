import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Products from './components/Products';
import Orders from './components/Orders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/orders" component={Orders} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
