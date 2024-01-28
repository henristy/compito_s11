import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import searchResultsSlice from '../slice/searchResultsSlice'; 
import favoritesSlice from '../slice/favoritesSlice'; 
import storage from 'redux-persist/lib/storage';
import albumSlice from '../slice/albumSlice';
import artistSlice from '../slice/artistSlice';
import queueSlice from '../slice/queueSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers ({
  searchResults: searchResultsSlice,
  favorites: favoritesSlice,
  album: albumSlice,
  artist: artistSlice,
  queue: queueSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
