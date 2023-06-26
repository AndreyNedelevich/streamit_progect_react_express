import React, {FC, Fragment} from "react"
import {Link} from "react-router-dom"


import './MoviesListCard.css'
import {IMovie} from "../../interfaces";
// import {urlsMovieDB} from "../../constans";
import {StarsReting} from "../StarsRating";
import {unavailable,posterImg} from "../../constans";


interface IProps {
    movie: IMovie;
}

const MoviesListCard: FC<IProps> = ({movie}) => {





    return (
        <Fragment>
            <Link to={`/movie/${movie.id}`} style={{textDecoration: "none", color: "white"}}>
                <div className="cards">
                    <img className="cards__img" src={movie.poster_path?`${posterImg}${movie.poster_path}`:unavailable} alt={movie.original_title}/>
                    <div className="cards__overlay ">
                        <div className="card__title">{movie ? movie.original_title : ""}</div>
                        <div className="card__runtime">
                            <span className='data__movie'>
                                {movie.vote_average.toFixed(1)}
                            </span>
                            <StarsReting retingMovie={movie.vote_average}/>
                        </div>
                        {movie ? movie.release_date : ""}
                        <div className="card__description">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
                    </div>
                </div>
            </Link>
        </Fragment>
    )
}

export {MoviesListCard}