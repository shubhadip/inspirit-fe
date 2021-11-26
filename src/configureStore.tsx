import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/index";

declare let window: any;

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [thunkMiddleware];

const combinedReducer: any = rootReducer;
const initalState: any = {};

export const store = createStore(
  combinedReducer,
  initalState,
  process.env.NODE_ENV === "development"
    ? composeEnhancers(applyMiddleware(...middleware))
    : applyMiddleware(...middleware)
);

