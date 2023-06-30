import React, { useEffect, useState } from 'react';
import icons from "../ultis/icons";
import { apiSearch } from "../apis";
import * as actions from "../store/action"
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import path from "../ultis/path"
import { createSearchParams } from 'react-router-dom';

const { FiSearch, AiOutlineClose } = icons;

const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState('')

    const handleSearch = async (e) => {
        if (e.keyCode === 13 ) {
            dispatch(actions.search(keyword))
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword
                }).toString()
            })
        }
    }

    return (
        <div className='w-full flex relative items-center'>
            {keyword && <span onClick={() => setKeyword("")} className='absolute right-3 cursor-pointer'><AiOutlineClose size={18} /></span>}
            <span className='h-10 pl-4 flex items-center justify-center rounded-l-[20px] bg-[#2F2739]'>
                <FiSearch size={20} />
            </span>
            <input
                type="text"
                className='outline-none w-full bg-[#2F2739] px-4 py-2 rounded-r-[20px] h-10'
                placeholder='Tìm kiếm bài hát, nghệ sĩ...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
            />
        </div>
    )
}

export default Search