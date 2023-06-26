import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue,} from '@reduxjs/toolkit';
import {AxiosError} from "axios";


import {IErrorMovie, IMovie, IResponseAll, ISearchParams} from "../../interfaces";
import {searchService} from "../../services";


interface IState {
    searchQuery: string
    searchMovies: IMovie[]
    pageSearch: number
    numOfPages: number
    errors: IErrorMovie,
    loading: boolean
}


const initialState: IState = {
    searchQuery: '',
    searchMovies: [],
    pageSearch: 1,
    numOfPages: 1,
    errors: null,
    loading: false
}


const getMoviesBySearch = createAsyncThunk<IResponseAll, ISearchParams>(
    'searchSlice/getMoviesBySearch',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await searchService.getSsearch(params)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const slice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setPageSearch: (state, action) => {
            state.pageSearch = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setSearchMovies: (state, action) => {
            state.searchMovies = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getMoviesBySearch.fulfilled, (state, action) => {
                if (state.pageSearch > 1) {
                    state.searchMovies = [...state.searchMovies, ...action.payload.results];
                } else {
                    state.searchMovies = action.payload.results
                }
                state.numOfPages = action.payload.total_pages;
            })
            .addMatcher(isPending(), (state) => {
                state.loading = true
                state.errors = null
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false
                state.errors = null
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors = action.payload as IErrorMovie
                state.loading = false
            })
})

const {actions, reducer: searchReducer} = slice


const searchActions = {
    ...actions,
    getMoviesBySearch

}

export {
    searchActions,
    searchReducer
}