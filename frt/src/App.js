import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "./store";
import {checkStore} from "./services/clientStore";
import Page from "./Page";

const store = configureStore();
checkStore(store);

const App = () => (
    <Provider store={store}>
        <Router>
            <Page />
        </Router>
    </Provider>
)

export default App;
