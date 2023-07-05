import React, {useRef, useEffect, Fragment} from "react"
import {NavLink, useNavigate} from "react-router-dom";


import {WbSunnyOutlined} from "@mui/icons-material";
import {DarkModeOutlined} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useContext} from "react";
import './Header.css'
import logo from '../../assets/imeges/logo.png';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ThemeContext, themes} from "../../context";
import {modalActions} from "../../redux";
import {EActionTokenModal} from "../../enums";
import {Profile} from "./Profile";


const Header = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const header = useRef(null);

    const context: any = useContext(ThemeContext);

    const {theme, setTheme} = context


    const switcTheme = () => {
        if (theme === themes.light) setTheme(themes.dark)
        if (theme === themes.dark) setTheme(themes.light)
    }


    useEffect(() => {
        const fixHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                header.current.classList.add('fix');
            } else {
                header.current.classList.remove('fix');
            }
        }


        window.addEventListener('scroll', fixHeader);
        return () => {
            window.removeEventListener('scroll', fixHeader);
        };
    }, [])


    const login = () => {
        navigate('/home')
        dispatch(modalActions.shownModal(EActionTokenModal.LOGIN))
    }


    const register = () => {
        navigate('/home')
        dispatch(modalActions.shownModal(EActionTokenModal.REGISTRATION))
    }


    return (
        <>
            <header ref={header} className='header'>
                <div className='container'>
                    <nav className='flexSB'>
                        <div className='logo'>
                            <img src={logo} alt='logo '/>
                        </div>
                        <ul className='flexSB'>
                            <li>
                                <NavLink to={'home'}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'trending'}>Trending</NavLink>
                            </li>
                            <li>
                                <NavLink to={'upcoming'}>Upcoming</NavLink>
                            </li>
                            <li>
                                <NavLink to={'top_rated'}>Top-Rated</NavLink>
                            </li>
                            <li>
                                <NavLink to={'movies'}>All Movies</NavLink>
                            </li>
                            <li>
                                <NavLink to={'search'}>Search</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className='flexSB'>
                        <IconButton
                            size="medium"
                            sx={{color: "inherit"}}
                            onClick={switcTheme}>
                            {theme === 'lights' && <WbSunnyOutlined fontSize="large"/>}
                            {theme === 'darks' && <DarkModeOutlined fontSize="large"/>}
                        </IconButton>
                        {user ? <Profile/> :
                            <div className='wrapper_register_login'>
                                <button onClick={login} className='button'>SINGL IN</button>
                                <div className='register' onClick={register}>REGISTRATION</div>
                            </div>}
                    </div>
                </div>
            </header>
        </>
    )
}

export {Header}