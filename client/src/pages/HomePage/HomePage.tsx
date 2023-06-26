import React, {useEffect} from 'react';

import '../PageStyle.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions, moviesActions} from "../../redux";
import {AppArrow, Footer, MovieListWithoutFilter, SliderMovie} from "../../components";
import {Loader} from "../../components";
import {LoginForm} from "../../components/LoginForm/LoginForm";
import {IUser} from "../../interfaces";
import {AuthModal} from "../../components/AuthModal";


const HomePage = () => {

   // const {isShowModalLogIn, isAuth, errorAuth,} = useAppSelector(state => state.authReducer)



    const dispatch = useAppDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(moviesActions.getNowPlaying())

        // if (localStorage.getItem('auth') && localStorage.getItem('password')) {
        //     const user: IUser = {
        //         username: localStorage.getItem('username' || ''),
        //         password: localStorage.getItem('password' || '')
        //     }
        //     dispatch(authActions.getAuthUser(user))
        // }
    }, [dispatch])


    const {now_playining, loading,errors} = useAppSelector((state) => state.movieReducer)
    const sliderNowPlayining = now_playining.slice(1, 12)


    return (
        <div>
            {loading && <Loader/>}
            <>
                <SliderMovie nowPlayining={sliderNowPlayining}/>
                {errors && <h1 style={{color: 'red', textAlign: 'center'}}>{errors.status_message}</h1>}
                <h2 className="list__title">New Films</h2>
                <MovieListWithoutFilter movies={now_playining}/>
            </>
            <AuthModal/>
            <AppArrow/>
            <Footer/>
        </div>
    );
};

export {HomePage};