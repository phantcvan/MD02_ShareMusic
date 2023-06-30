import React, { memo } from 'react';
import { handleNumber } from "../ultis/fn";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Artist = (props) => {
    const { key, image, title, follower, link } = props;
    const [isHover, setIsHover] = useState(false)

    return (
        <div key={key} className='w-1/5 flex flex-col gap-[15px] '>
            <Link
                className='relative overflow-hidden rounded-full cursor-pointer'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                to={link}
            >
                <img src={image} alt='singer' className={`w-full object-cover rounded-full ${isHover ? 'animate-scale-up-img' : 'animate-scale-down-img'}`} />
                {isHover && <div className='absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-full'></div>}
            </Link>
            <Link to={link} className='flex gap-1 flex-col items-center'>
                <span className='text-sm font-semibold hover:underline hover:text-[#B86DE1]'>{title}</span>
                <span className='text-xs '>{`${handleNumber(follower)} quan tâm`}</span>

            </Link>
        </div>
    )
}

export default memo(Artist)