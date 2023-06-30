import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/action";
import { toast } from "react-toastify";
import moment from "moment";
import { LoadingSong } from "./index"

const { AiOutlineHeart, AiFillHeart, BsThreeDots, MdSkipNext, MdSkipPrevious, TbRepeat, BsPauseCircle, BsPlayCircle,
  TbRepeatOnce, BsMusicNoteList, TbArrowsShuffle, BsVolumeUp, BsVolumeMute, } = icons
var intervalId;

const Player = ({ setShowRight }) => {
  const { curSongId, isPlaying, songs, recentSongs, favoriteSongs, userNow } = useSelector(state => state.music)
  const thumbRef = useRef()
  const trackRef = useRef()
  const dispatch = useDispatch()
  const [audio, setAudio] = useState(new Audio())
  const [songInfo, setSongInfo] = useState(null)
  const [curSecond, setCurSecond] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLoaded, setIsLoaded] = useState(true)
  const [toggleHeart, setToggleHeart] = useState(false)
  const { currentWidth } = useSelector(state => state.app)

  const sizeIcon = currentWidth <= 480 ? 10 : currentWidth <= 768 ? 13 : 16

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoaded(false)
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      setIsLoaded(true)
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data)
        dispatch(actions.setCurSongData(res1.data.data))
      }
      if (res2.data.err === 0) {
        audio.pause()
        setAudio(new Audio(res2.data.data['128']))
      } else if (res2.data.msg == 'Bài hát chỉ dành cho tài khoản VIP, PRI') {
        audio.pause()
        dispatch(actions.play(false))
        setAudio(new Audio())
        toast.warn(res2.data.msg);
        setCurSecond(0)
        thumbRef.current.style.cssText = `right: 100%`
        handleNextOneTime()
      }
    }
    fetchDetailSong()
  }, [curSongId])

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    if (isPlaying && thumbRef.current) {
      audio.play()
      intervalId = setInterval(() => {
        let percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setCurSecond(Math.round(audio.currentTime))
      }, 200)
    }
  }, [audio])
  // clear isPlaying!! --> BUG: when at HOME, progressbar is not active
  // have isPlaying: paused, then start: song start at 0:00

  // chuyển bài tự động khi bài nhạc kết thúc
  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle && repeatMode != 1) {
        handleShuffle()
      }
      if (!isShuffle && repeatMode == 2) {
        handleNext()
      }
      if (!isShuffle && repeatMode == 0) {
        handleNextOneTime()
      }
      if (repeatMode == 1) {
        handleRepeatOnce()
      }
    }
    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audio, isShuffle, repeatMode])

  // Change Volume
  useEffect(() => {
    audio.volume = volume / 100

  }, [volume])

  // PLAY MUSIC
  const play = async () => {
    await audio.play()
  }

  // PLAY/ PAUSE
  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause()
      dispatch(actions.play(false))
    } else {
      play()
      dispatch(actions.play(true))
    }
  }

  const handleChangeProgress = (e) => {
    const trackNow = trackRef.current.getBoundingClientRect()
    const percent = Math.round((e.clientX - trackNow.left) * 10000 / trackNow.width) / 100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = percent * songInfo?.duration / 100;
    setCurSecond(Math.round(percent * songInfo?.duration / 100))
  }

  // play next song
  const handleNextOneTime = () => {
    if (songs) {
      let curSongIndex
      songs?.forEach((item, index) => {
        if (item.encodeId == curSongId) curSongIndex = index
      })
      let next = curSongIndex;
      if (curSongIndex < (songs.length - 1)) {
        next = curSongIndex + 1
      }
      dispatch(actions.setCurSongId(songs[next].encodeId))
      dispatch(actions.play(true))
      if (curSongIndex == (songs.length - 1)) {
        audio.pause()
        dispatch(actions.play(false))
      }
    }
  }

  const handleNext = () => {
    if (songs) {
      let curSongIndex
      songs?.forEach((item, index) => {
        if (item.encodeId == curSongId) curSongIndex = index
      })
      let next = (curSongIndex < (songs.length - 1)) ? (curSongIndex + 1) : (0)
      dispatch(actions.setCurSongId(songs[next].encodeId))
      dispatch(actions.play(true))
    }
  }

  // play pre song
  const handlePre = () => {
    if (songs) {
      let curSongIndex
      songs?.forEach((item, index) => {
        if (item.encodeId == curSongId) curSongIndex = index
      })
      let pre = (curSongIndex > 0) ? (curSongIndex - 1) : (songs.length - 1)
      dispatch(actions.setCurSongId(songs[pre].encodeId))
      dispatch(actions.play(true))
    }
  }

  // shuffle
  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * songs.length) - 1
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
    dispatch(actions.play(true))
  }

  const handleRepeatOnce = () => {
    // console.log("repeat 1");
    audio.play()
  }

  // Thêm vào danh sách yêu thích
  const handleFavorite = () => {
    const newSong = {
      "userNow": userNow,
      "thumbnail": songInfo?.thumbnail,
      "title": songInfo?.title,
      "sid": songInfo?.sid,
      "artist": songInfo?.artistsNames
    }
    console.log('newSong',newSong);
    dispatch(actions.setFavorite(newSong))
    setToggleHeart(true)
  }

  const handleDeleteFavorite = () => {
    setToggleHeart(false)
  }
  return (
    <div className={`${currentWidth <= 480 ? 'px-3' : currentWidth <= 768 ? 'px-4' : 'px-5'} bg-main-400 h-full flex`}>
      <div className='w-[30%] flex gap-3 items-center'>
        <img src={songInfo?.thumbnail} alt="thumbnail"
          className={`${currentWidth <= 480 ? 'w-10 h-10' : currentWidth <= 768 ? 'w-12 h-12' : 'w-16 h-16'}object-cover rounded-md`} />
        <div className='flex flex-col  w-[70%]'>
          <span className='font-semibold text-white-700 text-sm'>
            {
              currentWidth <= 480
                ? `${songInfo?.title?.slice(0, 10)}...`
                : currentWidth <= 768
                  ? `${songInfo?.title?.slice(0, 20)}...`
                  : songInfo?.title
            }

          </span>
          {currentWidth <= 768
            ? ''
            : <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>}
        </div>
        <div className='flex gap-3 pl-2'>
          {/* {toggleHeart
            ? <span onClick={handleFavorite}>
              <AiOutlineHeart size={16} />
            </span>
            : <span onClick={handleDeleteFavorite}>
              <AiFillHeart size={16} />
            </span>
          } */}
          {/* <span>
            <BsThreeDots size={16} />
          </span> */}
        </div>
      </div>
      <div className={`${currentWidth <= 480 ? 'py-[2px] gap-2' : currentWidth <= 768 ? 'py-1 gap-3' : 'py-2 gap-5'} w-[40%] flex-auto flex items-center justify-center flex-col `}>
        <div className={`${currentWidth <= 480 ? 'gap-2' : currentWidth <= 768 ? 'gap-5' : 'gap-8'} flex justify-center items-center`}>
          <span
            onClick={() => { setIsShuffle(pre => !pre) }}
            className={`cursor-pointer ${isShuffle && 'text-[#C273ED]'}`}
            title={`${isShuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"}`}
          >
            <TbArrowsShuffle size={22} />
          </span>

          <span onClick={handlePre}
            className={`${!songs ? "text-gray-500 cursor-pointer" : "cursor-pointer"}`}>
            <MdSkipPrevious size={24} />
          </span>
          <span
            className='p-1 cursor-pointer hover:text-main-500 hover:text-[#C273ED]'
            onClick={handleTogglePlayMusic}>
            {!isLoaded ? <LoadingSong /> : isPlaying ? <BsPauseCircle size={35} /> : <BsPlayCircle size={35} />}

          </span>
          <span
            onClick={handleNext}
            className={`${!songs ? "text-gray-500 cursor-pointer" : "cursor-pointer"}`}>
            <MdSkipNext size={24} />
          </span>
          <span
            onClick={() => setRepeatMode(pre => pre == 2 ? 0 : pre + 1)}
            className={`cursor-pointer ${repeatMode && 'text-[#C273ED]'}`}
            title={`${repeatMode == 2 ? "Tắt phát lại" : repeatMode == 0 ? "Bật phát lại một bài" : "Bật phát lại tất cả"}`}
          >
            {repeatMode == 1 ? <TbRepeatOnce size={22} /> : <TbRepeat size={22} />}
          </span>

        </div>
        <div className='w-full flex items-center justify-center gap-2'>
          <span className='text-[#5A5560] text-xs'>
            {moment.utc(curSecond * 1000).format('mm:ss')}
          </span>
          <div
            ref={trackRef}
            onClick={handleChangeProgress}
            className='bg-[#5A5560] relative m-auto h-[3px] hover:h-[6px] cursor-pointer w-4/5 rounded-l-full rounded-r-full'
          >
            <div ref={thumbRef} id='thumb-progress' className='bg-white absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full'></div>
          </div>
          <span className='text-[#5A5560] text-xs'>
            {moment.utc(songInfo?.duration * 1000).format('mm:ss')}
          </span>
        </div>
      </div>
      <div className={`${currentWidth <= 480 ? 'gap-2' : currentWidth <= 768 ? 'gap-6' : 'gap-10'} w-[30%] flex flex-auto items-center justify-end`}>
        <div className='flex gap-2 items-center'>
          <span onClick={() => setVolume(pre => +pre == 0 ? 70 : 0)}>{volume == 0 ? <BsVolumeMute size={24} /> : <BsVolumeUp size={24} />}</span>
          <input type="range" step={1} min={0} max={100} value={volume}
            className={`bg-[#727272] text-white ${currentWidth <= 480 ? 'w-[60px]' : currentWidth <= 768 ? 'w-30' : 'w-full'}`}
            onChange={(e) => setVolume(e.target.value)} />
        </div>
        <span onClick={() => setShowRight(pre => !pre)} className='p-1 rounded-sm hover:text-[#DDDDDE]'><BsMusicNoteList size={20} /></span>
      </div>
    </div>
  )
}

export default Player