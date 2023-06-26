import React, {Fragment} from 'react';
import {useEffect} from "react";


import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux";
import {AppArrow, Footer, Loader, MovieListWithoutFilter, SliderMovie} from "../../components";
import {IParams} from "../../interfaces";

const UpcomingPage = () => {


    const {numPageAll, numOfPagesForAll} = useAppSelector((state) => state.movieReducer)

    const dispatch = useAppDispatch()
    const {upcomingMovies, loading, errors} = useAppSelector((state) => state.movieReducer)

    const params: IParams = {
        page: numPageAll.pageUpcoming,
        with_genres: ''
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        // dispatch(moviesActions.setUpcomingPage(1))
    }, [])

    useEffect(() => {
        dispatch(moviesActions.getUpcomingMovies(params))
    }, [numPageAll.pageUpcoming, dispatch])

    const sliderUpcoming = upcomingMovies.slice(1, 11)

    const loadMore = () => {
        dispatch(moviesActions.setUpcomingPage(numPageAll.pageUpcoming + 1))
    }

    const loadFirstPage = () => {
        dispatch(moviesActions.setUpcomingPage(1))
    }

    return (
        <>
            <SliderMovie nowPlayining={sliderUpcoming}/>
            {loading &&<Loader/>}
                <>
                    <h2 className="list__title">Upcoming films</h2>
                    {errors && <h1 style={{color: 'red', textAlign: 'center'}}>{errors.status_message}</h1>}
                    <MovieListWithoutFilter movies={upcomingMovies}/>
                    <div className='block__loader'>
                        {
                            numPageAll.pageUpcoming < numOfPagesForAll ? (
                                <button className='button__load' onClick={loadMore}>
                                    load more
                                </button>
                            ) : null
                        }
                        {
                            numPageAll.pageUpcoming > 1 ? (
                                <button className='button__load' onClick={loadFirstPage}>
                                     first page
                                </button>
                            ) : null
                        }
                    </div>
                </>
            <AppArrow/>
            <Footer/>
        </>

    );
};

export {UpcomingPage};


