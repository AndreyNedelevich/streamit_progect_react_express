import React from 'react';
import {useEffect} from "react";

import '../PageStyle.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux";
import {IParams} from "../../interfaces";
import {AppArrow, GlobalLoading,MovieListWithoutFilter, SliderMovie} from "../../components";


const TopRatedPage = () => {


    const dispatch = useAppDispatch()
    const {
        topRatedMovies,
        numOfPagesForAll,
        numPageAll,
        errors
    } = useAppSelector((state) => state.movieReducer)

    const params: IParams = {
        page: numPageAll.pageTop_Rated,
        with_genres: ''
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        // dispatch(moviesActions.setTopRatedPage(1))
    }, [])


    useEffect(() => {
        dispatch(moviesActions.getTopRatedMovies(params))
    }, [numPageAll.pageTop_Rated, dispatch])


    const sliderTrending = topRatedMovies.slice(3, 13);


    const loadMore = () => {
        dispatch(moviesActions.setTopRatedPage(numPageAll.pageTop_Rated + 1))
    }

    const loadFirstPage = () => {
        dispatch(moviesActions.setTopRatedPage(1))
    }


    return (
        <>
            <GlobalLoading/>
            <SliderMovie nowPlayining={sliderTrending}/>
                <h2 className="list__title">Top Rated Films</h2>
                {errors && <h1 style={{color: 'red', textAlign: 'center'}}>{errors.status_message}</h1>}
                <MovieListWithoutFilter movies={topRatedMovies}/>
                <div className='block__loader'>
                    {
                        numPageAll.pageTop_Rated < numOfPagesForAll ? (
                            <button className='button__load' onClick={loadMore}>
                                load more
                            </button>
                        ) : null
                    }
                    {
                        numPageAll.pageTop_Rated > 1 ? (
                            <button className='button__load' onClick={loadFirstPage}>
                                 first page
                            </button>
                        ) : null
                    }
                </div>
            <AppArrow/>
        </>
    );
};

export {TopRatedPage};
