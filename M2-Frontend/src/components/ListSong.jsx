import React, { memo } from 'react';
import { List } from "./";
import icons from "../ultis/icons";
import moment from "moment";
import { useSelector } from 'react-redux';

const { BsDot } = icons;

const ListSong = ({ totalDuration, isHideTime }) => {

  const { songs } = useSelector(state => state.music)

  return (
    <div className='w-full flex flex-col text-xs'>
      <div className='flex w-full items-center justify-between p-[10px] font-semibold '>
        <div className={`isHideTime?'w-[50%] text-gray-500':'w-[50%] text-white text-lg '`}>BÀI HÁT</div>
        {!isHideTime && <div className='w-[30%] text-gray-500'>ALBUM</div>}
        {!isHideTime && <div className='text-left text-gray-500'>THỜI GIAN</div>}
      </div>
      <div className='flex flex-col'>
        {songs?.map(item => (
          <List key={item.encodeId} songData={item} isHideNode />
        ))}
      </div>
      {totalDuration && <span className='flex items-center gap-1 text-gray-500 py-[10px] border-t border-[#231B2E]'>
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
      </span>
      }
    </div>
  )
}

export default memo(ListSong)