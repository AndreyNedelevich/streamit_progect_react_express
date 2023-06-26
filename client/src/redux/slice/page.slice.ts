import { createSlice,} from '@reduxjs/toolkit';

interface IState {
    pageAllMovies:number
}


const initialState: IState = {
    pageAllMovies:1,
}

const slice = createSlice({
    name: 'pageSlice',
    initialState,
    reducers: {
        setAllMoviesPage: (state, action) => {
            state.pageAllMovies = action.payload
        }
    }
})

const {actions, reducer: pageReducer} = slice


const pageActions={
    ...actions,


}

export {
    pageActions,
    pageReducer
}