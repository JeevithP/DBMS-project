// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import clubUserReducer from './clubUserSlice';
// import clubEventsReducer from './clubEventsSlice';
// import storage from 'redux-persist/lib/storage';  

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     clubUser: clubUserReducer,
//     clubEvents:clubEventsReducer,
//   },
// });
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Local storage to persist data
import { combineReducers } from 'redux';  // Combine reducers
import userReducer from './userSlice';
import clubUserReducer from './clubUserSlice';
import clubEventsReducer from './clubEventsSlice';
import counsellorReducer from './counsellorSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',  // Key for the persisted data
  storage,      // Use localStorage
};

// Combine all your reducers here
const rootReducer = combineReducers({
  user: userReducer,
  clubUser: clubUserReducer,
  clubEvents: clubEventsReducer,
  counsellor:counsellorReducer
});

// Create persisted reducer using persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,  // Use persisted reducer
});

export const persistor = persistStore(store);  // Create persistor to manage rehydration

