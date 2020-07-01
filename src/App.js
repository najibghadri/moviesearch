import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store/store";

import SearchScreen from "./SearchScreen";
import MovieDetails from "./MovieDetails";

import history from "./history";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={(match) => <SearchScreen match={match} />}
          />
          <Route
            exact
            path="/movies/:movieid"
            render={(match) => <MovieDetails  match={match} />}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
