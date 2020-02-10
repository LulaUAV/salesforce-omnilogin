import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import application from './modules/application/reducers';
import sections from './modules/sections/reducers';
import logins from './modules/logins/reducers';
import router from './modules/router/reducers';

let middlewares = [thunk];

export const store = createStore(
    combineReducers({
        application,
        sections,
        logins,
        router
    }),
    {},
    compose(
        applyMiddleware(...middlewares),
        persistState(['sections'])
    )
);
