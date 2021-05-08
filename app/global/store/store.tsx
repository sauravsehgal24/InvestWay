import allReducers from "../reducers/rootReducer";
const redux = require("redux");
const compose = redux.compose;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
//import thunkMiddleware from 'redux-thunk';
const thunkMiddleware = require("redux-thunk").default;

const store = createStore(
    allReducers,
    compose(
        applyMiddleware(thunkMiddleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);
export default store;
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
