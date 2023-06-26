import React, {Fragment, FC} from "react"

import './MovieList.css'
import {MoviesListCard} from "../MoviesListCard";
import {IMovie} from "../../interfaces";


interface IProps {
    movies: IMovie[]
}


const MovieListWithoutFilter: FC<IProps> = ({movies}) => {


    return (
        <Fragment>
            <div className="movie__list">
                <div className="list__cards">
                    {
                        movies.map(movie => (
                            <MoviesListCard key={movie.id} movie={movie}/>
                        ))
                    }
                </div>
            </div>

        </Fragment>
    )
}

export {MovieListWithoutFilter}