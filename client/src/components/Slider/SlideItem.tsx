import React, {FC} from "react"
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {urlsMovieDB} from "../../constans";
import './SlideMovies.css'


interface IProps {
    item: IMovie;
}


const SlideItem: FC<IProps> = ({item}) => {

    const navigate=useNavigate()

    const {title, poster_path, backdrop_path, overview,id} = item;
    const background = urlsMovieDB.bigImgMovie(backdrop_path ? backdrop_path : poster_path);


    return (
        <div className="poster"
             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${background})`}}>
            <div className="center-max-size">
                <div className="poster-content">
                    <button className={"btn play-video"}
                        onClick={() => navigate(`/movie/${id}`)}
                            type="button">Watch
                        Now
                    </button>
                    <h1>{title}</h1>
                    <p>{overview}</p>
                </div>
            </div>
        </div>
    )
}
export {SlideItem}