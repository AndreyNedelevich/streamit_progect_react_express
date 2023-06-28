import {combineReducers,configureStore} from "@reduxjs/toolkit";

import {movieReducer,movieInformreducer,genresReducer,pageReducer,searchReducer,modalReducer,userReducer} from "./slice";


const rootReducer=combineReducers({
    movieReducer,
    movieInformreducer,
    genresReducer,
    pageReducer,
    searchReducer,
    modalReducer,
    userReducer
})


const setupStore=()=>configureStore({
    reducer: rootReducer
})



type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']


export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}