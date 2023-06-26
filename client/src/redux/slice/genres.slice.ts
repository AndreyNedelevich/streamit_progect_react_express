import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue, isPending} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';


import {IErrorMovie, IGenre, IGenres} from "../../interfaces";
import {movieService} from "../../services";


interface IState {
    allGenres: IGenre[],
    selectedGenres: IGenre[],
    loading: boolean,
    errors: IErrorMovie,
}

const initialState: IState = {
    allGenres: [],
    selectedGenres: [],
    loading: false,
    errors: null,
}


const getAllGenres = createAsyncThunk<IGenres, void>(
    'genresSlice/getAllGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getGenres()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const slice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {
        setselectedGenres: (state, action) => {
            state.selectedGenres =action.payload
        },
        setGenres: (state, action) => {
            state.allGenres =action.payload
        },
    },

    extraReducers: builder =>
        builder
            .addCase(getAllGenres.fulfilled, (state, action) => {
                const {genres} = action.payload
                state.allGenres = genres;
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

const {actions, reducer: genresReducer} = slice


const genresActions = {
    ...actions,
    getAllGenres


}

export {
    genresActions,
    genresReducer
}