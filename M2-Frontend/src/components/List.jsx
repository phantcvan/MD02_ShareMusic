import React, { memo } from 'react';
import icons from "../ultis/icons";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../store/action";

const { BsMusicNoteBeamed } = icons


const List = ({ songData, isHideAlbum, isHideNode, order, }) => {
    const dispatch = useDispatch()
    const { recentSongs, userNow } = useSelector(state => state.music);
    const handlePlaySong = () => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play(true))
        dispatch(actions.playAlbum(true))
        const newSong={
            "userNow":userNow,
            "thumbnail": songData?.thumbnail,
            "title" : songData?.title,
            "sid": songData?.sid,
            "artist": songData?.artist
        }
        dispatch(actions.setRecent(newSong))

    }

    return (
        <div
            className='flex justify-between items-center p-[10px] border-t border-[#231B2E] hover:bg-[#2F2739] cursor-pointer'
            onClick={handlePlaySong}
        >
            <div className='flex items-center gap-3 flex-1'>
                {order && <span
                    className={`${order == 1
                        ? "text-[#427BC2]"
                        : order == 2
                            ? "text-[#1DC186]"
                            : order == 3
                                ? "text-[#E35050]"
                                : "text-[#BAB7BD]"} text-[32px] flex justify-center items-center flex-none w-[10%]`}
                >
                    {order}
                </span>}
                {!isHideNode && <span><BsMusicNoteBeamed /></span>}
                <img src={songData?.thumbnail} alt="thumbnailM" className='w-10 h-10 object-cover rounded-md' />
                <span className='flex flex-col w-full'>
                    <span className='text-sm font-semibold'>{songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)}...` : songData?.title}</span>
                    <span className='text-gray-500 text-xs'>{songData?.artistsNames}</span>
                </span>
            </div>
            {!isHideAlbum && <div className='w-[30%] flex items-center justify-left text-gray-500'>
                {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0, 30)}...` : songData?.album?.title}
            </div>}

            <div className='w-[20%] flex justify-end text-gray-500 text-xs'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(List)