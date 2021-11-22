import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import {createWhitelistFilter} from 'redux-persist-transform-filter';
import rootReducer from './ducks';
import rootSaga from './sagas';

const appFilter = createWhitelistFilter('AppReducer', ['configuration']);
const moviesFilter = createWhitelistFilter('MoviesReducer', [
  'genres',
  'trending',
]);
const userFilter = createWhitelistFilter('UserInformationReducer', [
  'streamingServices',
  'followingUsers',
]);

const persistConfig = {
  key: 'AppPersist',
  transforms: [appFilter, moviesFilter, userFilter],
  storage: AsyncStorage,
  whitelist: ['AppReducer', 'MoviesFilter', 'UserFilter'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
