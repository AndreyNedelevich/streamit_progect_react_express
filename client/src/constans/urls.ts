const apiKey='a697d646d69159e7e44e0dbe11a12e5a'
const authorization= 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjk3ZDY0NmQ2OTE1OWU3ZTQ0ZTBkYmUxMWExMmU1YSIsIm5iZiI6MTY4Mzk2NDg3Ni40NTIsInN1YiI6IjY0NWY0M2NjZGJiYjQyMDBlMjJjNDk1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNIPacQSUek_yRmx_1gF1Cns2AlCUttWWjeA1NXy6RU'


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




