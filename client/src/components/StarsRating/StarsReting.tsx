import React, {FC} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

import './StarsRating.css'

interface IProps{
    retingMovie:number
}

const StarsReting:FC<IProps> = ({ retingMovie}) => {


    const reting: number = retingMovie
    const remainder = 10 - reting
    const isInteger: boolean = Number.isInteger(reting)


    const integer = Math.trunc(reting)
    const remainderInteger = Math.trunc(remainder)



    return (
        <div className='poster__star'>
            {[...new Array(integer)].map((arr, index) => (
                <StarIcon key={index} />
            ))}
            {!isInteger && <StarHalfIcon  />}
            {[...new Array(remainderInteger)].map((arr, index) => (
                <StarBorderIcon key={index} />
            ))}
        </div>
    );
};

export {StarsReting};