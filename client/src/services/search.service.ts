import {axiosService} from "./axios.service";
import {IRes} from "../types";

import {urlsMovieDB} from "../constans";
import {ISearchParams, IResponseAll} from "../interfaces";


class SearchService {
    getSsearch(params:ISearchParams): IRes<IResponseAll> {
        const url = `${urlsMovieDB.search}/${urlsMovieDB.movie}`
        return axiosService.get(url,{params: params})
    }
}


export const searchService = new SearchService()