import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {FC} from "react";

import './PaginationMovies.css'
import {pageActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";



 const  PaginationMovies:FC=()=> {

     const dispatch = useAppDispatch()
     const {numPageAllMovies} = useAppSelector((state) => state.movieReducer)
     const {pageAllMovies} = useAppSelector((state) => state.pageReducer)



    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(pageActions.setAllMoviesPage(value))
        window.scroll(0, 0);
    };

    return (
        <div className='pagination'>
        <Stack spacing={10}>
            <Pagination color="primary"   count={numPageAllMovies} page={pageAllMovies} onChange={handleChange} />
        </Stack>
        </div>
    );
}


export {PaginationMovies}






















