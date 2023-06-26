const apiKey='a697d646d69159e7e44e0dbe11a12e5a'
const authorization= 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODJlN2Q1M2M3MTQ3OTFmZjczZmU4NzA3ODdmMDgxNSIsInN1YiI6IjU3ZWE0NjY0OTI1MTQxMTA4OTAwOGZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lEEivZliSc_G_UGJbP8p1LRlPXWu3U9erTCsUnRWP_U'


//  FOTO
const posterImg = "https://image.tmdb.org/t/p/w300";
const bigImg='https://image.tmdb.org/t/p/w500'
const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";


const baseUrl='https://api.themoviedb.org/3/'


const movie='movie';
const discover='discover'
const queryUpcoming='upcoming'
const queryPopular='popular';
const queryTop_rated='top_rated'
const videos='videos'
const cast='credits'
const similar='similar'
const search='search'
const genre='genre'
const now_playing='now_playing'



const urlsMovieDB={
    now_playing,
    movie,
    discover,
    queryUpcoming,
    queryPopular,
    queryTop_rated,
    genre,
    search,
    byIdMovieVideo:(id:number):string=>`${movie}/${id}/${videos}`,
    byIdMovieCastList:(id:number):string=>`${movie}/${id}/${cast}`,
    byIdDetailsMovie:(id:number):string=>`${movie}/${id}`,
    byIdSimilarForMovie:(id:number):string=>`${movie}/${id}/${similar}`,
    posterMovie: (path:string):string => `https://image.tmdb.org/t/p/original/${path}`,
    bigImgMovie: (path:string):string => `https://image.tmdb.org/t/p/w1280/${path}`
}



export {
    baseUrl,
    urlsMovieDB,
    authorization,
    apiKey,
    unavailable,
    posterImg,
    bigImg
}




