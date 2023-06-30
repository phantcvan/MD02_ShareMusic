import React, { useEffect, useState } from 'react';
import icons from "../ultis/icons"
import { useNavigate } from 'react-router';
import * as actions from "../store/action"
import { useDispatch, useSelector } from 'react-redux';
import { SongItem } from "./";
import { Link } from 'react-router-dom';
import path from '../ultis/path';


const { FcNext } = icons;

const NewRelease = () => {

    const { newRelease, currentWidth } = useSelector(state => state.app)
    const [isChoice, setIsChoice] = useState(0)
    const [category, setCategory] = useState([])
    const { userNow } = useSelector(state => state.music);
    const dispatch = useDispatch();
    const n = currentWidth<=480?'6':currentWidth<=1024?'8':'12'
    // useEffect(() => {
    //     dispatch(actions.setUserNow("v"));
    //   }, []);

    useEffect(() => {
        if (isChoice == 0) {
            setCategory(newRelease?.items?.all)
        } else if (isChoice == 1) {
            setCategory(newRelease?.items?.vPop)
        } else if (isChoice == 2) {
            setCategory(newRelease?.items?.others)
        }
    }, [isChoice, newRelease])

    return (
        <div 
        className={`${currentWidth <= 480 ? ' px-[19px] mt-4' : currentWidth <= 1024 ? 'px-[39px] mt-8' : 'px-[59px] mt-12'} 
        flex flex-col gap-5`}>
            <div className='flex items-center justify-between'>
                <h3 className='text-[24px] font-bold'>{newRelease?.title}</h3>
            </div>
            <div className='flex justify-between items-center'>
                <div className={`${currentWidth<=480?'gap-2':currentWidth<=1024?'gap-4':'gap-5'} flex items-center text-xs`}>
                    <button
                        type='button'
                        onClick={() => setIsChoice(0)}
                        className={`py-1 rounded-l-full px-5 rounded-r-full border border-[#2F2739] 
                     ${isChoice == 0 ? 'bg-main-500' : 'bg-transparent'}
                     ${currentWidth<=480?'px-2':'px-5'}`}
                    >
                        TẤT CẢ
                    </button>
                    <button
                        type='button'
                        onClick={() => setIsChoice(1)}
                        className={`py-1 rounded-l-full rounded-r-full border border-[#2F2739] 
                     ${isChoice == 1 ? 'bg-main-500' : 'bg-transparent'}
                     ${currentWidth<=480?'px-2':'px-5'}`}
                    >
                        VIỆT NAM
                    </button>
                    <button
                        type='button'
                        onClick={() => setIsChoice(2)}
                        className={`py-1 rounded-l-full rounded-r-full border border-[#2F2739] 
                     ${isChoice == 2 ? 'bg-main-500' : 'bg-transparent'}
                     ${currentWidth<=480?'px-2':'px-5'}`}
                    >
                        QUỐC TẾ
                    </button>
                </div>
                <Link to={path.NEW_RELEASE} className='flex gap-2'>
                    <span className='text-xs text-[#86818C]'>TẤT CẢ </span>
                    <FcNext />
                </Link>
            </div>
            <div className='flex flex-wrap w-full '>
                {category?.filter((i, index) => index < n)?.map((item) => (
                    <div className={`${currentWidth<=480?'w-[95%]':currentWidth<768?"w-[48%]":'w-[32%]'}`}>
                        <SongItem
                            key={item.encodeId}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artist={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}
                            userNow={userNow}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewRelease