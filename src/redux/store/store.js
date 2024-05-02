import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

//Constant
import rootReducer from '../reducers';

const whiteListedReducer = [];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: whiteListedReducer,
};
const perReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: perReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// const store = createStore(perReducer, applyMiddleware(...middleWare))
const persistedStore = persistStore(store);

export {store, persistedStore};
