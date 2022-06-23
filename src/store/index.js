// Base imports
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import {provide} from 'core-module/middleware/state';
import storage from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createEncryptor from 'redux-persist-transform-encrypt';
import rootSaga from '../data/sagas';
import reducers from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const encryptor = createEncryptor({
  secretKey: 'mifrase',
  onError(error) {
    return error;
  },
});

export const persistConfig = {
  key: 'test00',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [encryptor],
  whitelist: [
    'loginDiners',
    'oauthToken',
    'customer',
    'establishment',
    'commercePlatform',
  ],
  blacklist: ['enums'],
};

const store = createStore(
  persistReducer(persistConfig, reducers(history)),
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    /* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
    process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
);

sagaMiddleware.run(rootSaga);

provide(store);

export {store};
export const persistor = persistStore(store);
