import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {RequiredAuth} from "../hoc";
import { HomePage, UpcomingPage, TrendingPage, TopRatedPage, MoviesPage,SearchPage} from "../pages";
import {PosterPreview} from "../components/PosterPreview";
import "react-toastify/dist/ReactToastify.css";


enum RouteNames {
    HOME = 'home',
    MOVIES = 'movies',
    TRENDING = 'trending',
    TOP_RATED = 'top_rated',
    UPCOMING = 'upcoming',
    SEARCH = 'search',
    IDMOVIE='movie/:id'
}


const RoutesConfig = () => {
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        <Routes>
            <Route index element={<Navigate to={RouteNames.HOME}/>}/>
            <Route  path={RouteNames.HOME} element={<HomePage/>}/>
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
        </Routes>
        </>
    );
};

export {RoutesConfig};











