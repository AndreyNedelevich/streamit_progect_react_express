import {axiosService} from "./axios.service";
import {IRes} from "../types";

import {urlsMovieDB} from "../constans";
import {IMovie, IVideos, IDetailsByMovie, ICastList, IGenres, IResponseAll, IResponseTOP, IParams} from "../interfaces";


class MovieService {
    getAllMovies(params:IParams): IRes<IResponseAll> {
        const url = `${urlsMovieDB.discover}/${urlsMovieDB.movie}`
        return axiosService.get(url,  {params: params})
    }

    getTrendingMovies(params:IParams): IRes<IResponseAll> {
        const url = `${urlsMovieDB.movie}/${urlsMovieDB.queryPopular}`
        return axiosService.get(url, {params: params})
    }

    getUpcomingMovies(params:IParams): IRes<IResponseAll> {
        const url = urlsMovieDB.movie + '/' + urlsMovieDB.queryUpcoming
        return axiosService.get(url, {params: params})
    }


    getTopRatedMovies(params:IParams): IRes<IResponseAll> {
        const url = `${urlsMovieDB.movie}/${urlsMovieDB.queryTop_rated}`
        return axiosService.get(url, {params: params})
    }

    getNowPlayinig():IRes<IResponseTOP>{
        const url =`${urlsMovieDB.movie}/${urlsMovieDB.now_playing}`
        return axiosService.get(url)
    }

    getGenres():IRes<IGenres>{
        const url=`${urlsMovieDB.genre}/${urlsMovieDB.movie}/list`
        return axiosService.get(url)
    }

    getSimilarForMovie(id: number): IRes<IMovie[]> {
        const url = urlsMovieDB.byIdSimilarForMovie(id)
        return axiosService.get(url)
    }

    getMovieVideos(id: any): IRes<IVideos> {
        const url = urlsMovieDB.byIdMovieVideo(id)
        return axiosService.get(url)
    }

    getDetailsAboutMovie(id: number): IRes<IDetailsByMovie> {
        const url = urlsMovieDB.byIdDetailsMovie(id)
        return axiosService.get(url)
    }

    getCastListForMovie(id: number): IRes<ICastList> {
        const url = urlsMovieDB.byIdMovieCastList(id)
        return axiosService.get(url)
    }

    search(params:any): IRes<IResponseAll> {
        const url = `${urlsMovieDB.search}/${urlsMovieDB.movie}`
        return axiosService.get(url,params)
    }

}


export const movieService = new MovieService()