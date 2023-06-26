import React, {Fragment, useEffect} from 'react';
import Chip from '@mui/material/Chip';



import {useAppSelector, useAppDispatch} from "../../hooks";
import {genresActions, pageActions} from "../../redux";
import './Genres.css'
import {IGenre} from "../../interfaces";


const Genres = () => {


    const {allGenres, selectedGenres} = useAppSelector((state) => state.genresReducer)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(genresActions.getAllGenres())
    }, [dispatch])

    const handleAdd = (genre: IGenre) => {
        !selectedGenres.includes(genre)&&dispatch(genresActions.setselectedGenres([...selectedGenres, genre]));
        dispatch(pageActions.setAllMoviesPage(1))
    };


    const handleDelete = (genre: IGenre) => {
        dispatch(genresActions.setselectedGenres(selectedGenres.filter(select => select.id !== genre.id)))
        dispatch(pageActions.setAllMoviesPage(1))

    };


    return (
        <Fragment>
            <h3 className='genres__title'>Genres</h3>
            <div className="genres__list">
                {allGenres.map(genre => (
                    <Chip
                        label={genre.name}
                        key={genre.id}
                        variant="outlined"
                        size="medium"
                        onClick={() => handleAdd(genre)}
                        clickable
                    />
                ))}
            </div>
            {!!selectedGenres.length && <h3 className='genres__title'>Genres selected </h3>}
            <div className="genres__list_select">
                {selectedGenres.map(genre => (
                    <Chip
                        label={genre.name}
                        key={genre.id}
                        color="primary"
                        size={"medium"}
                        onDelete={() => handleDelete(genre)}
                        clickable
                    />
                ))}
            </div>
                {/*<Button onClick={submit} size='large' variant="contained">filter</Button>*/}
        </Fragment>

    )
}

export {Genres}

