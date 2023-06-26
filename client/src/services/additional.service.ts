import {axiosService} from "./axios.service";
import {IRes} from "../types";

import {urlsMovieDB} from "../constans";
import {IMovie, IVideos, IDetailsByMovie, ICastList} from "../interfaces";


class AdditionalService {

    getSimilarForMovie(id: number): IRes<IMovie[]> {
        const url = urlsMovieDB.byIdSimilarForMovie(id)
        return axiosService.get(url,{params:{}})
    }

    getMovieVideos(id: number): IRes<IVideos> {
        const url = urlsMovieDB.byIdMovieVideo(id)
        return axiosService.get(url,{params:{}})
    }

    getDetailsAboutMovie(id: number): IRes<IDetailsByMovie> {
        const url = urlsMovieDB.byIdDetailsMovie(id)
        return axiosService.get(url,{params:{}})
    }

    getCastListForMovie(id: number): IRes<ICastList> {
        const url = urlsMovieDB.byIdMovieCastList(id)
        return axiosService.get(url,{params:{}})
    }

}


export const aditionalService = new AdditionalService()