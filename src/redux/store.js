import { applyMiddleware, combineReducers, createStore } from "redux";
import { auth_reducer } from "./reducers/auth_reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  auth: auth_reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// export const server = "https://production-nodejs-ecommerce.onrender.com/api/v1";
export const server = "http://localhost:8080"
