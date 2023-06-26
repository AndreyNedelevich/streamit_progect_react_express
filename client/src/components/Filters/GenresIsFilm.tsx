import React, {FC, Fragment} from 'react';
import Chip from '@mui/material/Chip';



import {useAppSelector, useAppDispatch} from "../../hooks";
import {genresActions, pageActions} from "../../redux";
import './GenreIsFilm.css'
import {IGenre} from "../../interfaces";
import {useNavigate} from "react-router-dom";

interface IProps{
genre:IGenre
}


const GenresisFilm:FC<IProps> = ({genre}) => {



    const {selectedGenres} = useAppSelector((state) => state.genresReducer)
    const dispatch = useAppDispatch()



   const navigate= useNavigate()

const searchGanre=(genre:IGenre)=>{
        navigate('/movies')
        dispatch(genresActions.setselectedGenres([genre]))
        dispatch(pageActions.setAllMoviesPage(1))
}


    return (
        <Fragment>
            <div className="genres__card">
                    <Chip
                        label={genre.name}
                        key={genre.id}
                        variant="outlined"
                        size="medium"
                        onClick={() => searchGanre(genre)}
                        clickable
                    />

            </div>
        </Fragment>

    )
}

export {GenresisFilm}
