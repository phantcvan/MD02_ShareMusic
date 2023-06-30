import React, { memo } from 'react';
import icons from "../ultis/icons"
import { useNavigate } from 'react-router';
import { TopItem } from "./";
import { Link } from 'react-router-dom';
import path from '../ultis/path';
import { useSelector } from 'react-redux';



const { FcNext } = icons;


const Top = ({ data }) => {
    const navigate = useNavigate()
    const { currentWidth } = useSelector(state => state.app)
    const n = currentWidth < 600 ? 2 : currentWidth < 800 ? 3 : 4

    return (
        <div className={`${currentWidth <= 480 ? ' px-[19px] mt-4' : currentWidth <= 1024 ? 'px-[39px] mt-8' : 'px-[59px] mt-12'} flex flex-col gap-5`}>
            <div className='flex items-center justify-between'>
                <h3 className='text-[24px] font-bold'>{data?.title}</h3>
                {data?.title == "Top 100" &&
                    <Link to={path.TOP_100} className='flex gap-2'>
                        <span className='text-xs text-[#86818C]'>TẤT CẢ </span>
                        <FcNext />
                    </Link>
                }
            </div>
            <div className='flex justify-between gap-[28px]'>
                {data && data?.items?.length > 0 && data.items?.filter((item, index) => index <= n).map(item => (
                    <TopItem
                        key={item.encodeId}
                        link={item.link}
                        thumbnailM={item.thumbnailM}
                        title={
                            currentWidth <= 480
                                ? `${item.title?.slice(0, 20)}...`
                                : currentWidth <= 768
                                    ? `${item.title?.slice(0, 30)}...`
                                    : item.title
                        } />
                ))}

            </div>
        </div>
    )
}

export default memo(Top)