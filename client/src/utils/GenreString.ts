import {IGenre} from "../interfaces";

const GenreString=(selectedGenres:IGenre[]):string=>{
    if (selectedGenres.length<1) return ''
    const GenreId = selectedGenres.map((g) => g.id.toString());
    return GenreId.reduce((acc, curr) => acc + "," + curr);
}

export {GenreString}