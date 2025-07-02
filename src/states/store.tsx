import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import reduxStorage from "./storage";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

const persisConfig = {
    key: 'root',
    storage: reduxStorage,
    blacklist: [],
    whitelist: ['user', 'cart']
}


const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH, REGISTER, REHYDRATE,PAUSE, PERSIST, PURGE]
        }
    }),
    
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
