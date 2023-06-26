import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";


import 'normalize.css';
import './index.css';
import {setupStore} from "./redux";
import {ThemeProvider} from "./context";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();
root.render(
    <Provider store={store}>
        <ThemeProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </ThemeProvider>
    </Provider>
);


