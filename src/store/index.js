import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import doctorReducer from "./reducres/doctorReducer";
import adminReducer from "./reducres/adminReducre";
import userReducer from "./reducres/userReducers";
import reviewReducer from "./reducres/reviewReducer";
import blogReducer from "./reducres/blogReducer";

const rootReducer = combineReducers({
    doctor: doctorReducer,
    admin: adminReducer,
    user: userReducer,
    review: reviewReducer,
    blog: blogReducer,
});
// Connect to Redux DevTools browser extension (works with Redux v5)
const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
