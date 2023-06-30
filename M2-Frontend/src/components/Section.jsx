import React, { memo, useState } from 'react';
import icons from "../ultis/icons"
import { useNavigate } from 'react-router';
import { SectionItem } from "./";
import { useSelector } from 'react-redux';

const { FcNext } = icons;

const Section = ({ data }) => {
    const navigate = useNavigate()
    const { currentWidth } = useSelector(state => state.app)
    const n = currentWidth <= 480 ? 2 : currentWidth <= 768 ? 3 : 4

    return (
        <div className={`${currentWidth <= 480 ? ' px-[14px] mt-2' : currentWidth <= 1024 ? 'px-[29px] mt-3' : 'px-[44px] mt-4'} flex flex-col gap-5`}>
            <div className='flex items-center justify-between'>
                <h3 className='text-[24px] font-bold'>{data?.title}</h3>
                {/* {data?.items?.length > 5 &&
                    <div className='flex gap-2'>
                        <span className='text-xs text-[#86818C]'>TẤT CẢ </span>
                        <FcNext />
                    </div>
                } */}
            </div>
            <div className='flex justify-between items-start '>
                {data && data?.items?.length > 0 && data.items?.filter((item, index) => index <= n).map(item => (
                    <SectionItem
                        key={item.encodeId}
                        title={item.title}
                        data={data}
                        link={item.link}
                        thumbnailM={item.thumbnailM}
                        sortDescription={
                            currentWidth <= 480 
                              ? `${item.sortDescription?.slice(0, 20)}...`
                              : item.sortDescription
                          } />
                    // item.sortDescription >= 30 ? `${item.sortDescription?.slice(0, 30)}...` : item.sortDescription
                ))}

            </div>
        </div>
    )
}

export default memo(Section)