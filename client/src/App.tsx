import React from 'react';

import './App.css';
import {authService} from "./services";
import {authorization} from "./constans";
import {Header} from "./components";
import {RoutesConfig} from "./routesConfig";



function App() {
  authService.setTokens(authorization)



  return (
    <div >
         <Header/>
        <RoutesConfig/>
    </div>
  );
}

export default App;
