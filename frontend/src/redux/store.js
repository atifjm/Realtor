import {configureStore, combineReducers} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({user: userSlice.reducer})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedRootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: false,
    })
})

export const persistor = persistStore(store)