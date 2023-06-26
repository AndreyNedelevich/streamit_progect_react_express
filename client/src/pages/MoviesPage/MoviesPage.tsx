import React from 'react';
import {useEffect} from "react";

import '../PageStyle.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import { moviesActions} from "../../redux";
import {IParams} from "../../interfaces";
import {AppArrow, Footer, Loader, MovieList} from "../../components";
import {GenreString} from "../../utils";
import {PaginationMovies} from "../../components";


const MoviesPage = () => {

    const {pageAllMovies} = useAppSelector((state) => state.pageReducer)


    const dispatch = useAppDispatch()
    const {movies, loading, errors} = useAppSelector((state) => state.movieReducer)

    const {selectedGenres} = useAppSelector(state => state.genresReducer)

    const stringSelectedGenres = GenreString(selectedGenres)


    const params: IParams = {
        page: pageAllMovies,
        with_genres: stringSelectedGenres
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(moviesActions.setAllMoviesPage(1))
    }, [])


    useEffect(() => {
        dispatch(moviesActions.getAllMovies(params))
        window.scrollTo(0, 0)
    }, [dispatch, selectedGenres, pageAllMovies])



    return (
        <div>
            <div className='dark'></div>
            {loading && <Loader/>}
            {errors && <h1 style={{color:'red', textAlign:'center'}}>{errors.status_message}</h1> }
                <h2 className="list__title">All Films</h2>
                <MovieList movies={movies}/>
            <PaginationMovies/>
            <AppArrow/>
            <Footer/>
        </div>
    );
};

export {MoviesPage};