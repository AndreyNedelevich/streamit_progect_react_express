import React, {Fragment,FC} from "react"


import './MovieList.css'
import {MoviesListCard} from "../MoviesListCard";
import {Genres} from "../Filters";
import {Card} from "../UI";
import {IMovie} from "../../interfaces";



interface IProps{
    movies:IMovie[]
}


const MovieList:FC<IProps> = ({movies}) => {




    return (
        <Fragment>
            <div className='movie__grid'>
                <div className='movie__filter'>
                    <Card>
                 <Genres/>
                    </Card>
                </div>
                <div className="movie__list">

                    <div className="list__cards">
                        {
                            movies.map(movie => (
                                <MoviesListCard key={movie.id} movie={movie}/>
                            ))
                        }
                    </div>
                    {/*<PaginationMovies/>*/}
                </div>
            </div>
        </Fragment>
    )
}

export {MovieList}