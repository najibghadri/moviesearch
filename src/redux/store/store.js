import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../reducers/reducers";

const composeEnhancers = process.env.NODE_ENV==="production" ? compose : ( window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

// from https://stackoverflow.com/questions/36730793/can-i-dispatch-an-action-in-reducer
// This middleware will just add the property "async dispatch"
// to actions with the "async" propperty set to true
const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
    Object.assign({}, action, { asyncDispatch });

  const res = next(actionWithAsyncDispatch);

  syncActivityFinished = true;
  flushQueue();

  return res;
};

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(asyncDispatchMiddleware)
  )
); // REMOVE PROD
