import React,{useEffect} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";


import {RequiredAuth} from "../hoc";
import {HomePage, UpcomingPage, TrendingPage, TopRatedPage, MoviesPage, SearchPage} from "../pages";
import {PosterPreview} from "../components/PosterPreview";
import { Notification, PasswordUpdate} from "../components";
import {ShowModal} from "../components";
import {ForgotPassword} from "../components/ForgotPassword";
import {Activate} from "../components";
import {useAppDispatch} from "../hooks";
import {authService} from "../services";
import { userActions} from "../redux";
import {authorization} from "../constans";
import {Profile} from "../components/Header/Profile";


enum RouteNames {
    HOME = 'home',
    HOME_ACTIVATED='home/:actionToken',
    MOVIES = 'movies',
    TRENDING = 'trending',
    TOP_RATED = 'top_rated',
    UPCOMING = 'upcoming',
    SEARCH = 'search',
    IDMOVIE = 'movie/:id',
    RESTORE_PASSWORD = 'restore-password/:actionToken',
    CHANGE_PASSWORD = 'password-update',
    Profile='profile'
}


const RoutesConfig = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        authService.setTokensfromMovieDB(authorization)
        dispatch(userActions.getUserByToken())
    }, [dispatch]);

    return (
        <div className='main_container'>
            <Notification/>
            <ShowModal/>
            <Routes>
                <Route index element={<Navigate to={RouteNames.HOME}/>}/>
                <Route path={RouteNames.HOME} element={<HomePage/>}>
                    <Route path={RouteNames.HOME_ACTIVATED} element={<Activate/>} />
                </Route>
                <Route path={RouteNames.TRENDING} element={
                    <RequiredAuth>
                        <TrendingPage/>
                    </RequiredAuth>
                }/>
                <Route path={RouteNames.UPCOMING} element={
                    <RequiredAuth>
                        <UpcomingPage/>
                    </RequiredAuth>
                }/>
                <Route path={RouteNames.TOP_RATED} element={
                    <RequiredAuth>
                        <TopRatedPage/>
                    </RequiredAuth>
                }/>
                <Route path={RouteNames.MOVIES} element={
                    <RequiredAuth>
                        <MoviesPage/>
                    </RequiredAuth>
                }/>
                <Route path={RouteNames.SEARCH} element={
                    <RequiredAuth>
                        <SearchPage/>
                    </RequiredAuth>
                }/>
                <Route path={RouteNames.IDMOVIE} element={<PosterPreview/>}/>
                <Route path={RouteNames.RESTORE_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={RouteNames.CHANGE_PASSWORD} element={
                    <RequiredAuth>
                        <PasswordUpdate/>
                    </RequiredAuth>
                }/>
                <Route path={RouteNames.Profile} element={
                    <RequiredAuth>
                        <Profile/>
                    </RequiredAuth>
                }/>
            </Routes>
        </div>
    );
};

export {RoutesConfig};











