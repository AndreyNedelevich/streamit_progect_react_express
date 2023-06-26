import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from "axios";

import {IDetailsByMovie, IErrorMovie, IVideo,IVideos} from "../../interfaces";

import {aditionalService} from "../../services";


interface IState {
    movieInfo:IDetailsByMovie
    videosForFilms:IVideo[]
    loading:boolean,
    errors:IErrorMovie,
}


const initialState: IState = {
    movieInfo: null,
    videosForFilms:[],
    loading:false,
    errors:null
}


const getInfoMovie=createAsyncThunk<IDetailsByMovie,number>(
    'movieInfoSlice/getInfoMovie',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await aditionalService.getDetailsAboutMovie(id)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)





const slice = createSlice({
    name: 'movieInfoSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getInfoMovie.fulfilled,(state,action)=>{
                state.movieInfo = action.payload;
            })
            .addMatcher(isPending(getInfoMovie), (state) => {
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

const {reducer: movieInformreducer, actions} = slice


const movieInfoActions = {
    ...actions,
    getInfoMovie,
}

export {
    movieInfoActions,
    movieInformreducer
}
