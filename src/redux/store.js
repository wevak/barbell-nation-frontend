import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

import { auth_reducer } from "./reducers/auth_reducer";
import { customer_reducer } from "./reducers/customer_reducer";
import { package_reducer } from "./reducers/package_reducer";

const rootReducer = combineReducers({
  auth: auth_reducer,
  customer: customer_reducer,
  package: package_reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

// export const server = "https://production-nodejs-ecommerce.onrender.com/api/v1";
export const server = "http://localhost:8080"
