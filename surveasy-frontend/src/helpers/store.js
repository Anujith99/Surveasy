import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "reducers";

let store;

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), ReactReduxDevTools)
  );
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
