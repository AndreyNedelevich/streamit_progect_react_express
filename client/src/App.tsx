import React from 'react';


import './App.css';
import { Header, MainFooter} from "./components";
import {RoutesConfig} from "./routesConfig";



function App() {


    return (
        <div>
            <Header/>
            <RoutesConfig/>
            <MainFooter/>
        </div>
    );
}

export default App;
