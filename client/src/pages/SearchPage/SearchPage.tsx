import React, {Fragment, useState, useEffect} from 'react';


import {useAppDispatch, useAppSelector} from "../../hooks";
import {ISearchParams} from "../../interfaces";
import {searchActions} from "../../redux";
import {AppArrow,MovieListWithoutFilter, Search} from "../../components";
import {LinearLoader} from "../../components/UI/Loader/LinearLoader";


const SearchPage = () => {

    const [query, setQuery] = useState("");


    const {
        numOfPages,
        searchQuery,
        pageSearch,
        searchMovies,
        loading,errors
    } = useAppSelector(state => state.searchReducer)
    const dispatch = useAppDispatch()


    const params: ISearchParams = {
        query: searchQuery,
        page: pageSearch
    };


    const loadMore = () => {
        dispatch(searchActions.setPageSearch(pageSearch + 1))
    }


    useEffect(() => {
        if (query.trim().length === 0) {
            dispatch(searchActions.setPageSearch(1))
            dispatch(searchActions.setSearchMovies([]))
        } else {
            dispatch(searchActions.getMoviesBySearch(params))
        }


    }, [pageSearch, searchQuery])



    return (
        <Fragment>
            <div className='dark'></div>
            {loading && <LinearLoader/>}
            <>
                {errors && <h1 style={{color:'red', textAlign:'center'}}>{errors.status_message}</h1> }
                <div className='conteiner__search'>
                    <h2 className="list__title">Search movies</h2>
                    <Search setQuery={setQuery}/>
                </div>
                <MovieListWithoutFilter movies={searchMovies}/>
                <div className='block__loader'>
                    {
                        pageSearch < numOfPages ?
                            (
                            <button className='button__load' onClick={loadMore}>
                                load more
                            </button>
                        ) : null
                    }
                </div>
            </>
            <AppArrow/>
        </Fragment>
    );
};

export {SearchPage};