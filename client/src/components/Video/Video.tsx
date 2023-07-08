import React, {useEffect, FC, useState} from 'react';

import './Video.css'
import {aditionalService} from "../../services";
import {IVideo} from "../../interfaces";
import {useAppSelector} from "../../hooks";

import {AxiosError} from "axios";



interface IProps {
    id: number
}

const Video: FC<IProps> = ({id}) => {

    const { errors} = useAppSelector((state) => state.movieInformreducer)
    const [video, setVideos] = useState<IVideo>(null)


    useEffect(() => {
        const getVideos = async () => {
            try {
                const {data} = await aditionalService.getMovieVideos(id);
                console.log(data);
                const findOficialTreiller = data.results.find(item => item.name === "Official Trailer")
                const trailer = findOficialTreiller || data.results[0] || data.results[1] || data.results[2]
                setVideos(trailer);
            } catch (e) {
                const err = e as AxiosError
            }
        };
        getVideos();
    }, [id]);


    return (
        <>
            {errors&& <h1 style={{color:'red', textAlign:'center'}}>{errors.status_message}</h1> }
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
