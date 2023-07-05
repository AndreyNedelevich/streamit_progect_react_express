import React, {useEffect} from 'react';

import '../PageStyle.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux";
import {AppArrow, MovieListWithoutFilter, SliderMovie} from "../../components";
import {GlobalLoading} from "../../components";
import {Outlet} from "react-router-dom";


const HomePage = () => {


    const dispatch = useAppDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(moviesActions.getNowPlaying())
    }, [dispatch])


    const {now_playining, loading, errors} = useAppSelector((state) => state.movieReducer)
    const sliderNowPlayining = now_playining.slice(1, 12)


    return (
                <>
                    <GlobalLoading/>
                    <SliderMovie nowPlayining={sliderNowPlayining}/>
                    {errors && <h1 style={{color: 'red', textAlign: 'center'}}>{errors.status_message}</h1>}
                    <h2 className="list__title">New Films</h2>
                    <MovieListWithoutFilter movies={now_playining}/>
                    <Outlet/>
                    <AppArrow/>
                </>
    );
};

export {HomePage};