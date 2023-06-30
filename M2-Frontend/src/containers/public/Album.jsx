import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import * as apis from "../../apis";
import moment from "moment";
import { ListSong, AudioLoading } from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import * as actions from "../../store/action"
import { useDispatch, useSelector } from 'react-redux';
import icons from "../../ultis/icons"

const { BsFillPlayFill } = icons

const Album = () => {
  const location = useLocation()

  const { pid } = useParams()
  const [playlistData, setPlaylistData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { isPlaying } = useSelector(state => state.music)
  const { currentWidth } = useSelector(state => state.app)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid))
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true))
      const response = await apis.apiGetDetailPlaylist(pid)
      dispatch(actions.loading(false))
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data)
        dispatch(actions.setPlaylist(response.data?.data?.song?.items))
      }
    }
    fetchDetailPlaylist()
  }, [pid])
  // Nếu click play ngoài trang chủ
  useEffect(() => {
    if (location.state?.playAlbum) {
      dispatch(actions.setCurSongId(playlistData?.song?.items[0]?.encodeId))
      dispatch(actions.play(true))
    }
  }, [pid, playlistData])

  return (
    <div className={`${currentWidth <= 480 ? 'px-[19px] flex-col' : currentWidth <= 1024 ? 'px-[39px]' : 'px-[59px]'}
    flex relative gap-8 w-full h-full animate-scale-up-center py-4`}>

      <div className={`${currentWidth<=780?'w-full':'w-[30%] flex-col'} flex-none flex items-center gap-2`}>
        <div className={`${currentWidth<=780?'w-1/2':'w-full'} overflow-hidden relative`}>
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnail"
            className='w-full object-cover rounded-md transition-transform duration-300 hover:scale-110 shadow-md'
          />
          <div className='absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center'>
            <span className='p-3 border border-white rounded-full'>
              {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
            </span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <h3 className='text-[20px] font-bold text-white-800'>{playlistData?.title}</h3>
          <span className='flex gap-2 items-center text-gray-500 text-xs'>
            <span>Cập nhật:</span>
            <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
          </span>
          <span className='flex gap-2 items-center text-gray-500 text-xs text-center'>{playlistData?.artistsNames}</span>
          <span className='flex gap-2 items-center text-gray-500 text-xs text-center'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
        </div>
      </div>
{currentWidth<=768
? <div className='flex-auto'>
<span className='text-sm'>
  <span className='text-gray-600'>Lời tựa </span>
  <span>{playlistData?.sortDescription}</span>
</span>
<ListSong totalDuration={playlistData?.song?.totalDuration} />
</div>
: <Scrollbars style={{ width: '100%', overflow: "hidden" }}>
        <div className='flex-auto'>
          <span className='text-sm'>
            <span className='text-gray-600'>Lời tựa </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <ListSong totalDuration={playlistData?.song?.totalDuration} />
        </div>
      </Scrollbars>
}
    </div>
  )
}

export default Album