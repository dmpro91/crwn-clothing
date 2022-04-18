import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import { rootReducer } from "./root-reducer";

const presistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const presistedReducer = persistReducer(presistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(presistedReducer, undefined, composeEnhancers);

export const presistor = persistStore(store);
