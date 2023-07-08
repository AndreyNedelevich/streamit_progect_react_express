import React,{useState,useEffect} from 'react';

import {LinearLoader} from "../LinearLoader";
import logo from "../../../../assets/imeges/logo.png";

import './GlobalLoading.css'
import {useAppSelector} from "../../../../hooks";

const GlobalLoading = () => {

    const { loading} = useAppSelector((state) => state.movieReducer)

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [loading]);

    return (
        <div className={isLoading? 'globalLoading opacity_visible':'globalLoading opacity_hidden'}>
            <LinearLoader/>
            <div className='globalLoading_logo'>
                <img  src={logo} alt='logo '/>
            </div>
        </div>
    );
};
//style={{visibility:isLoading?'visible':'hidden'}}
export {GlobalLoading};