import React, {Fragment, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {urlsMovieDB} from "../../constans";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieInfoActions} from "../../redux";
import {StarsReting} from "../StarsRating";
import {Video} from "../Video";
import {GenresisFilm} from "../Filters";
import './PosterPreview.css'
import {AppArrow, Loader} from "../UI";
import {Footer} from "../Footer";

const PosterPreview = () => {
    const {id} = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(movieInfoActions.getInfoMovie(+id))
    }, [id])


    const dispatch = useAppDispatch()
    const {movieInfo, loading} = useAppSelector((state) => state.movieInformreducer)


    return (
        <>
            {movieInfo &&
                <>
                    {<span className='loading__movie'>
                        {loading && <Loader/>}
                    </span>}
                    <div className="poster heignt__poster"
                         style={{
                             backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), 
                     url(${movieInfo ? urlsMovieDB.bigImgMovie(movieInfo.backdrop_path) : ''})`
                         }}>

                    </div>
                    <div className="mb-3 movie-content containers">
                        <div className="movie-content__poster">
                            <div className="movie-content__poster__img"
                                 style={{backgroundImage: `url(${urlsMovieDB.posterMovie(movieInfo.poster_path || movieInfo.backdrop_path)})`}}>
                            </div>
                        </div>
                        <div className="movie-content__info">
                            <h1 className="title">
                                {movieInfo.title || movieInfo.belongs_to_collection.name}
                            </h1>

                            <div className='data__movie__block'>
                                <span className='data__movie__reting'>
                                {movieInfo.vote_average.toFixed(1)}
                            </span>
                                <StarsReting retingMovie={movieInfo.vote_average}/>
                            </div>

                            <h3 className='data__movie__release'>
                                <span>Release date </span> <i>{movieInfo ? movieInfo.release_date : ""}</i>
                            </h3>
                            <h3 className='data__movie__release'>
                                Runtime <i>{movieInfo ? movieInfo.runtime : ""} min</i>
                            </h3>

                            <div className="genres">
                                {
                                    movieInfo.genres && movieInfo.genres.slice(0, 6).map((genre, i) =>
                                        <GenresisFilm key={genre.id} genre={genre}/>
                                    )
                                }
                            </div>
                            <p className="overview">{movieInfo.overview}</p>
                        </div>
                    </div>
                    <div className="section mb-3">
                        <Video id={+id}/>
                    </div>
                </>

            }
            <AppArrow/>
            <Footer/>
        </>
    )
}

export {PosterPreview};