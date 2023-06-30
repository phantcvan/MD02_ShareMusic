import React, { useEffect, useState } from 'react';
import icons from "../ultis/icons";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import { apiGetDetailPlaylist } from "../apis";
import Scrollbars from 'react-custom-scrollbars-2';

const { ImBin } = icons

const SidebarRight = ({ }) => {

  const [isRecent, setIsRecent] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [playlist, setPlaylist] = useState()
  const { curSongId, curSongData, isPlaying, curAlbumId, recentSongs, userNow } = useSelector(state => state.music)


  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId)
    if (response?.data?.err == 0) setPlaylist(response.data.data?.song?.items)
  }

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist()
  }, [])

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist()
  }, [curAlbumId, isPlaying])
  // console.log(recentSongs)
  // console.log(userNow)

  // Nếu bật 1 bài hát thì tự chuyển sang "DS phát"
  useEffect(() => {
    isPlaying && setIsRecent(false)
  }, [isPlaying, curSongId])
  const recentSongUser = recentSongs?.filter(obj => obj.userNow == userNow)

  return (
    <div className='flex flex-col text-xs w-full h-full'>
      <div className='h-[70px] w-full flex-none py-[14px] px-2 flex items-center justify-between'>
        <div
          className='w-[80%] flex justify-between bg-[#2A2139] text-sm rounded-l-full 
            rounded-r-full cursor-pointer'>
          <span
            className={`rounded-l-full rounded-r-full py-2 px-4 ${!isRecent && "bg-[#6A6475]"}`}
            onClick={() => setIsRecent(false)}
          >
            Danh sách phát
          </span>
          <span
            className={`rounded-l-full rounded-r-full py-2 px-4 ${isRecent && "bg-[#6A6475]"}`}
            onClick={() => setIsRecent(true)}
          >
            Nghe gần đây
          </span>
        </div>
      </div>
      {isRecent
        ? <div className='w-full flex flex-col flex-auto'>
          <Scrollbars autoHide style={{ width: '100%', height: '100%', }}>
            {recentSongs && <div className='flex flex-auto flex-col'>
              {recentSongUser?.map(item => (
                <SongItem
                  key={item?.sid}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artist={item?.artist}
                  sid={item?.sid}
                  size={"w-[40px] h-[40px]"}
                  isDelete
                />
              ))}
            </div>}
          </Scrollbars >
        </div>

        : <div className='w-full flex flex-col flex-auto'>
          <Scrollbars autoHide style={{ width: '100%', height: '100%', }}>
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artist={curSongData?.artistsNames}
              sid={curSongData?.encodeId}
              size={"w-[40px] h-[40px]"}
              style='bg-[#9B4DE0]'
              styleArt="text-[#C79CEE]"
            />
            <div className='flex flex-col pt-[15px] px-2 pb-[5px]'>
              <span className='text-sm font-semibold mb-1'>Tiếp theo</span>
              <span className='text-xs '>
                <span className='text-[#888491]'>Từ playlist </span>
                <span className='text-[#C172EB]'>
                  {curSongData?.album?.title?.length > 30 ? `${curSongData?.album?.title.slice(0, 30)}...` : curSongData?.album?.title}
                </span>
              </span>
            </div>
            {playlist && <div className='flex flex-auto flex-col'>
              {playlist?.map(item => (
                <SongItem
                  key={item?.encodeId}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artist={item?.artistsNames}
                  sid={item?.encodeId}
                  size={"w-[40px] h-[40px]"}
                />
              ))}
            </div>}
          </Scrollbars >
        </div>
      }
      <div className='w-full h-[90px]'></div>
    </div>

  )
}

export default SidebarRight