import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <SearchScreen />
          </Route>
          <Route
            path="/search/:roomid"
            render={(matchProps) => <ResultScreen {...matchProps} />}
          />
          <Route
            path="/:movieid"
            render={(matchProps) => <ResultScreen {...matchProps} />}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
