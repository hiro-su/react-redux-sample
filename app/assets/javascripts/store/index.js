'use strict';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const logger = createLogger();
export const baseHistory = browserHistory;
const routingMiddleware = routerMiddleware(baseHistory);

const enhancer = compose(
  applyMiddleware(routingMiddleware, logger, thunkMiddleware)
);

const store = createStore(
  combineReducers({rootReducer, routing: routerReducer}),
  enhancer
);

//export const history = syncHistoryWithStore(baseHistory, store);

export default store;
