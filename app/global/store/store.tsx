import allReducers from "../reducers/rootReducer";
const redux = require("redux");
const compose = redux.compose;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
//import thunkMiddleware from 'redux-thunk';
const thunkMiddleware = require("redux-thunk").default;
const _compose =
    process.env.NODE_ENV === "production"
        ? compose(applyMiddleware(thunkMiddleware))
        : compose(
              applyMiddleware(thunkMiddleware)
              //   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
              //       (window as any).__REDUX_DEVTOOLS_EXTENSION__()
          );
const store = createStore(allReducers, _compose);
export default store;
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
