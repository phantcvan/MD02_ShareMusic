import React, { memo } from 'react';
import moment from "moment";
import 'moment/locale/vi'
import * as actions from "../store/action"
import icons from "../ultis/icons";
import { useDispatch, useSelector } from 'react-redux';

const { ImBin } = icons
const SongItem = ({ userNow, thumbnail, title, artist, isDelete, releaseDate, sid, order, percent, style, size, styleArt }) => {
    const dispatch = useDispatch()
    const { recentSongs } = useSelector(state => state.music);

    const handleAddRecent = () => {
        dispatch(actions.setCurSongId(sid))
        dispatch(actions.play(true))
        dispatch(actions.setRecent({ userNow, thumbnail, title, sid, artist }))
    }
    const handleDelete=()=>{
        dispatch(actions.deleteRecent(sid))
    }
    return (
        <div
            className={`w-full flex p-[10px] rounded-md justify-between items-center cursor-pointer ${style || "hover:bg-main-200 "}`}>
            <div className='flex gap-[10px] items-center' onClick={handleAddRecent}>
                {order && <span className={`text-[32px] ${order == 1 ? "text-[#4A90E2]" : order == 2 ? "text-[#27BD9C]" : "text-[#E35050]"}`}>{order}</span>}
                <img src={thumbnail} alt="thumbnail" className={`${size || "w-[40px] h-[40px]"} object-cover rounded-md`} />
                <div className='flex flex-col'>
                    <span className='text-sm font-semibold text-white'>
                        {title?.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </span>
                    <span
                        className={`${styleArt || "text-[#7F7B86]"} text-xs py-1`}>
                        {artist?.length > 30 ? `${artist.slice(0, 30)}...` : artist}
                    </span>
                    {releaseDate && <span className='text-[#7F7B86] text-xs '>{moment(releaseDate * 1000).fromNow()}</span>}
                </div>

            </div>
            <div>
                {percent && <span className='font-bold'>{`${percent}%`}</span>}
                {isDelete && <span className='p-1 rounded-full hover:bg[#493961]' onClick={handleDelete}>
                    <ImBin size={16} />
                    </span>}

            </div>
        </div>
    )
}

export default memo(SongItem) 