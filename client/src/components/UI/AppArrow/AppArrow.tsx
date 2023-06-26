import React from 'react';
import NavigationIcon from '@mui/icons-material/Navigation';

import './AppArrow.css'

const AppArrow = () => {


    const scroll=()=>{
        window.scrollTo(0,0)
    }


    return (
        <div className='arrow'>
           <NavigationIcon onClick={scroll}/>
        </div>
    );
};


export {AppArrow};