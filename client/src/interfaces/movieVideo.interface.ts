export interface IVideo{
     iso_639_1: string,
     iso_3166_1: string,
     name: string,
     key: string,
     published_at: string,
     site: string,
     size: number,
     type: string,
     official: false,
     id: string,
 }



export interface IVideos{
    id:number,
    results:IVideo[]
}






