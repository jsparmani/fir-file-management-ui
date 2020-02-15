import React from "react";
import "./App.css";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import Home from "./pages/Home";
import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
let persistor = persistStore(store);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Home />
                </PersistGate>
            </Provider>
        );
    }
}
