import React, { useEffect, useState } from 'react';
import icons from "../../ultis/icons"
import { useNavigate } from 'react-router';
import * as actions from "../../store/action"
import { useDispatch, useSelector } from 'react-redux';
import { SongItem } from "../../components";


const { FcNext } = icons;

const New = () => {

    const { newRelease, currentWidth } = useSelector(state => state.app)
    const [isChoice, setIsChoice] = useState(0)
    const [category, setCategory] = useState([])
    const { userNow } = useSelector(state => state.music);
    const dispatch = useDispatch();
    const n = currentWidth <= 480 ? 1 : currentWidth <= 768 ? 2 : 3
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
        <div className={`${currentWidth <= 480 ? ' px-[19px] mt-4' : currentWidth <= 1024 ? 'px-[39px] mt-8' : 'px-[59px] mt-12'} flex flex-col gap-5`}>
            <div className='flex items-center justify-between'>
                <h3 className='text-[32px] font-bold'>MỚI PHÁT HÀNH</h3>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center text-xs gap-5'>
                    <button
                        type='button'
                        onClick={() => setIsChoice(0)}
                        className={`py-1 px-5 rounded-l-full rounded-r-full border border-[#2F2739] 
                     ${isChoice == 0 ? 'bg-main-500' : 'bg-transparent'}`}
                    >
                        TẤT CẢ
                    </button>
                    <button
                        type='button'
                        onClick={() => setIsChoice(1)}
                        className={`py-1 px-5 rounded-l-full rounded-r-full border border-[#2F2739]
                    ${isChoice == 1 ? "bg-main-500" : 'bg-transparent'}`}
                    >
                        VIỆT NAM
                    </button>
                    <button
                        type='button'
                        onClick={() => setIsChoice(2)}
                        className={`py-1 px-5 rounded-l-full rounded-r-full border border-[#2F2739] 
                    ${isChoice == 2 ? "bg-main-500" : 'bg-transparent'}`}
                    >
                        QUỐC TẾ
                    </button>
                </div>
            </div>
            <div className='flex flex-wrap w-full '>
                {category?.map((item) => (
                    <div className={`${currentWidth <= 480 ? 'w-[95%]' : currentWidth <= 768 ? 'w-[48%]' : 'w-[32%]'}`}>
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

export default New