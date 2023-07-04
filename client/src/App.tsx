import React from 'react';

import {authService} from "./services";
import {authorization} from "./constans";
import './App.css';
import {Footer, Header} from "./components";
import {RoutesConfig} from "./routesConfig";
import {useAppSelector} from "./hooks";


function App() {



    return (
        <div>
            <Header/>
            <RoutesConfig/>
            <Footer/>
        </div>
    );
}

export default App;
