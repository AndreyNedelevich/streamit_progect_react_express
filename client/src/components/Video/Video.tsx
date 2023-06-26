import React, {useEffect, FC,useState} from 'react';

import './Video.css'
import {aditionalService} from "../../services";
import {IVideo} from "../../interfaces";




interface IProps {
    id: number
}

const Video: FC<IProps> = ({id}) => {

    const [video,setVideos]= useState<IVideo>(null)


    useEffect( () => {
        const getVideos = async () => {
            const {data} = await aditionalService.getMovieVideos(id);
            const findOficialTreiller = data.results.find(item => item.name === "Official Trailer")
             //const trailer=findOficialTreiller ? findOficialTreiller : data.results[0]?data.results[1]:data.results[2]
           const trailer=findOficialTreiller  || data.results[0]||data.results[1]||data.results[2]
            setVideos(trailer);
        };
        getVideos();
    }, [id]);




    return (
        <>
            {video &&
                <div className="video">
                    <div className="video__title">
                    </div>
                    <iframe
                        className="video__pleer"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        allowFullScreen={true}
                        title="video"

                    ></iframe>
                </div>}
        </>)
}


export {Video}
