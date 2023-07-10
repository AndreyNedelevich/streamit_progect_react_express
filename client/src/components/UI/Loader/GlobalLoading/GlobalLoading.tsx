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
            }, 700);
        }
    }, [loading]);

    return (
        <div className={loading?'globalLoading opacity_hidden': 'globalLoading opacity_visible'}>
            <LinearLoader/>
            <div className='globalLoading_logo'>
                <img  src={logo} alt='logo '/>
            </div>
        </div>
    );
};


export {GlobalLoading};