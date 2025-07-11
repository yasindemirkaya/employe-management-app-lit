import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, 
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import employeeReducer from './employeeSlice.js';
import settingsReducer from './settingsSlice.js';

const employeePersistConfig = {
  key: 'employee',
  storage,
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
};

const persistedEmployeeReducer = persistReducer(employeePersistConfig, employeeReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);

const store = configureStore({
  reducer: {
    employee: persistedEmployeeReducer,
    settings: persistedSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


const persistor = persistStore(store);

export { store, persistor };
