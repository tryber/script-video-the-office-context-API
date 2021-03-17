import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './Context/Provider';
import Episodes from './Pages/Episodes';
import Favorites from './Pages/Favorites';

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ Episodes }
          />
          <Route
            path="/fav"
            component={ Favorites }
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
