import React from 'react';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";


import {moviesActions} from "../../redux";
import '../PageStyle.css'
import {AppArrow, Footer, Loader, MovieListWithoutFilter, SliderMovie} from "../../components";
import {IParams} from "../../interfaces";


const TrendingPage = () => {

    const dispatch = useAppDispatch()


    const {numPageAll, numOfPagesForAll} = useAppSelector((state) => state.movieReducer)
    const {trendingMovies, loading, errors} = useAppSelector((state) => state.movieReducer)


    const params: IParams = {
        page: numPageAll.pageTrending,
        with_genres: ''
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        // dispatch(moviesActions.setTrendingPage(1))
    }, [])


    useEffect(() => {
        dispatch(moviesActions.getTrendingMovies(params))
    }, [dispatch, numPageAll.pageTrending])

    const sliderTrending = trendingMovies.slice(2, 12)

    const loadMore = () => {
        dispatch(moviesActions.setTrendingPage(numPageAll.pageTrending + 1))


    }

    const loadFirstPage = () => {
        dispatch(moviesActions.setTrendingPage(1))
    }

    return (
        <>
            <SliderMovie nowPlayining={sliderTrending}/>
            {loading && <Loader/>}
            <>
                <h2 className="list__title">Trending Films</h2>
                {errors && <h1 style={{color: 'red', textAlign: 'center'}}>{errors.status_message}</h1>}
                <MovieListWithoutFilter movies={trendingMovies}/>
                <div className='block__loader'>
                    {
                        numPageAll.pageTrending < numOfPagesForAll ? (
                            <button className='button__load' onClick={loadMore}>
                                load more
                            </button>
                        ) : null
                    }
                    {
                        numPageAll.pageTrending > 1 ? (
                            <button  className='button__load' onClick={loadFirstPage}>
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

export {TrendingPage};