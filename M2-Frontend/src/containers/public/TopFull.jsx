import React, { memo } from 'react';
import icons from "../../ultis/icons"
import { useNavigate } from 'react-router';
import { TopItem } from "../../components";
import { useSelector } from 'react-redux';


const { FcNext } = icons;


const TopFull = () => {
    const navigate = useNavigate()
    const { top100, currentWidth } = useSelector(state => state.app)

    return (
        <div className={` ${currentWidth <= 480 ? 'mt-4 px-[19px]' : currentWidth <= 768 ? 'mt-8 px-[39px]' : 'mt-12 px-[59px]'}
        flex flex-col gap-5 w-full`}>
            <div className='flex items-center justify-between'>
                <h3 className='text-[32px] font-bold'>TOP 100</h3>
            </div>
            <div className='flex justify-between flex-wrap'>
                {top100 && top100?.items?.length > 0 && top100.items.map(item => (
                    <div className={`flex ${currentWidth <= 480 ? 'p-2 w-1/3' : currentWidth <= 768 ? 'p-3 w-1/4' : 'p-4 w-1/5'}`}>
                        <TopItem
                            key={item.encodeId}
                            link={item.link}
                            thumbnailM={item.thumbnailM}
                            title={item.title} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default TopFull