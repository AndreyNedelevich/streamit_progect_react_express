import React, {FC} from 'react';


import {useAppDispatch} from "../../hooks";
import {searchActions} from "../../redux";
import './Search.css'
import {ISetState} from "../../types/setState.type";



interface IProps {
    setQuery: ISetState<string>
}

const Search: FC<IProps> = ({setQuery}) => {

    const dispatch = useAppDispatch()


    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        dispatch(searchActions.setSearchQuery(newQuery))
        setQuery(newQuery)
    };


    return (
        <div className="movie__search">
            <input className='input' type='text' placeholder='Search'
                   onChange={(e) => {
                       onQueryChange(e)
                   }}/>
        </div>
    );
};

export {Search};