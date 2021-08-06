import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
  whitelist: ['PokemonReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, createLogger()));

sagaMiddleware.run(rootSaga);

let persistor = persistStore(store);

pausePersistor = () => {
  if (persistor) {
    persistor.pause();
  }
};

clearPersistor = () => {
  if (persistor) {
    persistor.purge();
  }
};


export default {
  store,
  persistor,
  pausePersistor,
  clearPersistor
};
