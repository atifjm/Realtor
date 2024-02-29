import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import storage from "redux-persist/lib/storage";
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist"
import {persistStore, persistReducer} from "redux-persist"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({user: userReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),  
    })

export const persistor = persistStore(store)
