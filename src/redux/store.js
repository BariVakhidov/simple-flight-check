import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import departuresReducer from "./departures-reducer";
import createSagaMiddleware from "redux-saga"
import {sagaWatcher} from "./sagas";

const saga = createSagaMiddleware();

const reducers = combineReducers({departures: departuresReducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(saga)));

saga.run(sagaWatcher);

window.store = store;
export default store;