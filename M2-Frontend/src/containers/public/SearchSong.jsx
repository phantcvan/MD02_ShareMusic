import React, { useEffect } from 'react';
import { List, ListSong } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/action';

const SearchSong = () => {
  const { searchData } = useSelector(state => state.music)
  console.log("searchData", searchData);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getSearchSong(searchData?.top?.id))
  }, [searchData])
  return (
    <div className='w-full flex flex-col px-[60px]'>
      <ListSong isHideTime />
    </div>
  )
}

export default SearchSong