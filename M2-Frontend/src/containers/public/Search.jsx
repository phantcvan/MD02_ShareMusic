import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router';
import { searchMenu } from '../../ultis/menu';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const notActiveStyle = 'py-3 px-4 cursor-pointer h-[50px]'
const activeStyle = 'py-3 px-4 font-semibold cursor-pointer border-b-2 border-[#B86DE1] text-[#B86DE1] h-[50px] flex item-center'

const Search = () => {

    const { keyword } = useSelector(state => state.music)
    // console.log("keyword", keyword);
    const searchKeyword = keyword?.replace(/ /g, '+');
    return (
        <div className='w-full'>
            <div className='flex mx-3 items-center border-b border-[#2F2739] pl-[60px] '>
                <span className='text-[24px] h-[50px] font-bold pr-6'>Kết Quả Tìm Kiếm</span>
                <div className='flex items-center border-l border-[#2F2739] text-sm'>
                    {searchMenu.map(item => (
                        <NavLink
                            key={item.path}
                            to={`${item.path}?q=${searchKeyword}`}
                            className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
            <div className='w-full'></div>
        </div>
    )
}

export default Search