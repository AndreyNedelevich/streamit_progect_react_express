import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue,isPending} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';


import {IMovie, IResponseTOP, IResponseAll, IErrorMovie, IParams} from "../../interfaces";
import {movieService} from "../../services";


interface IState {
    movies: IMovie[],
    now_playining: IMovie[],
    trendingMovies:IMovie[],
    upcomingMovies:IMovie[],
    topRatedMovies:IMovie[],

    numPageAllMovies:number;
    numPageTopRated:number,
    numOfPagesForAll:number

    numPageAll:{
        pageTrending:number
        pageUpcoming:number
        pageTop_Rated:number
        pageAllMovies:number

    }

    loading:boolean,
    errors:IErrorMovie,
}


const initialState: IState = {
    movies: [],
    now_playining: [],
    trendingMovies:[],
    upcomingMovies:[],
    topRatedMovies:[],

    numPageAllMovies:1,
    numPageTopRated:1,
    numOfPagesForAll:25,

    numPageAll:{
        pageTrending:1,
        pageUpcoming:1,
        pageTop_Rated:1,
        pageAllMovies:1,
    },
    loading:false,
    errors:null
}



const getAllMovies=createAsyncThunk<IResponseAll,IParams>(
    'movieSlice/getAllMovies',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAllMovies(params)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const getTrendingMovies=createAsyncThunk<IResponseAll,IParams>(
    'movieSlice/getTrendingMovies',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTrendingMovies(params)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getUpcomingMovies=createAsyncThunk<IResponseAll,IParams>(
    'movieSlice/getUocomingMovies',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getUpcomingMovies(params)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getTopRatedMovies=createAsyncThunk<IResponseAll,IParams>(
    'movieSlice/getTopRatedMovies',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTopRatedMovies(params)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const getNowPlaying=createAsyncThunk<IResponseTOP,void>(
    'movieSlice/getNowPlaying',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getNowPlayinig()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)



const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setTrendingPage: (state, action) => {
            state.numPageAll.pageTrending = action.payload
        },
        setUpcomingPage: (state, action) => {
            state.numPageAll.pageUpcoming = action.payload
        },
        setTopRatedPage: (state, action) => {
            state.numPageAll.pageTop_Rated = action.payload
        },
        setAllMoviesPage: (state, action) => {
            state.numPageAll.pageAllMovies = action.payload
        }
    },


    extraReducers: builder =>
        builder
            .addCase(getNowPlaying.fulfilled,(state,action)=>{
                const {results} = action.payload;
                state.now_playining=results
            })

            .addCase(getAllMovies.fulfilled,(state,action)=>{
                state.movies=action.payload.results
                state.numPageAllMovies=action.payload.total_pages
            })

            .addCase(getTrendingMovies.fulfilled,(state,action)=>{
                if (state.numPageAll.pageTrending > 1) {
                    state.trendingMovies = [...state.trendingMovies, ...action.payload.results];
                } else {
                    state.trendingMovies = action.payload.results
                }
            })

            .addCase(getUpcomingMovies.fulfilled,(state,action)=>{
                if (state.numPageAll.pageUpcoming > 1) {
                    state.upcomingMovies = [...state.upcomingMovies, ...action.payload.results];
                } else {
                    state.upcomingMovies = action.payload.results
                }
            })

            .addCase(getTopRatedMovies.fulfilled,(state,action)=>{
                if (state.numPageAll.pageTop_Rated > 1) {
                    state.topRatedMovies = [...state.topRatedMovies, ...action.payload.results];
                } else {
                    state.topRatedMovies = action.payload.results
                }
                state.numPageTopRated=action.payload.total_pages
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

const {actions, reducer: movieReducer} = slice


const moviesActions={
    ...actions,
    getNowPlaying,
    getAllMovies,
    getTrendingMovies,
    getUpcomingMovies,
    getTopRatedMovies

}

export {
    moviesActions,
    movieReducer
}
