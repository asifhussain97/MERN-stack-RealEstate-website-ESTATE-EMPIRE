import authSlice from '../slice/Auth/UserAuthSlice';
import AdminAuthSlice from '../slice/Auth/AdminAuthSlice';
import AgentAuthSlice from '../slice/Auth/AgentAuthSlice'; // Renamed import
import propertySlice from '../slice/PropertySlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookingSlice from '../slice/bookingSlice';




const rootReducer = combineReducers({
    user: authSlice,
    admin: AdminAuthSlice,
    agent: AgentAuthSlice, // Renamed field
    property: propertySlice,
    book: bookingSlice,



});

const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
    reducer: persistedReducer,
});
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
