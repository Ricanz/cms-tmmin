// src/redux/store.ts

import { createStore, combineReducers } from "redux";
import counterReducer from "./reducers/counterReducer";
import titleReducer from "./reducers/titleReducer";
import loginReducer from "./reducers/loginReducer";
import tagManager from "./reducers/tagManagerReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    titleReducer: titleReducer,
    loginReducer: loginReducer,
    tagManager: tagManager,
});

const store = createStore(rootReducer);

export default store;
