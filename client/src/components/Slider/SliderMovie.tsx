import React, {FC} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay,Keyboard, Pagination, Navigation } from "swiper";


import './SlideMovies.css'
import {IMovie} from "../../interfaces";
import {SlideItem} from "./SlideItem";


interface IProps {
    nowPlayining: IMovie[] | []
}


const SliderMovie: FC<IProps> = ({nowPlayining}) => {




    return (
        <div className='homeContainer'>
            <Swiper
                speed={700}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard,Autoplay, Pagination, Navigation]}
                className="mySwiper"

            >
                {nowPlayining.map((item,id) => (
                        <SwiperSlide>
                                  <SlideItem key={id} item={item}/>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    );
};

export {SliderMovie};






