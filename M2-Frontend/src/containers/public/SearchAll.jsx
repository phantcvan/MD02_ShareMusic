import React from 'react';
import { useSelector } from 'react-redux';
import { handleNumber } from "../../ultis/fn";
import { List, SongItem, TopItem, Artist } from "../../components";
import icons from "../../ultis/icons"

const { FcNext } = icons;

const SearchAll = () => {
  const { searchData } = useSelector(state => state.music)
  return (
    <div className='w-full flex flex-col px-[60px]'>
      <div className='flex flex-col'>
        <h3 className='text-lg font-bold mb-5'>Nổi Bật</h3>
        <div className='flex gap-6'>
          {searchData?.top &&
            <div className='p-[10px] cursor-pointer bg-[#231B2E] hover:bg-main-200 rounded-md flex flex-1 gap-8 items-center'>
              <img src={searchData.top.thumbnail} alt="avatar"
                className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType == 'artist' && 'rounded-full'}`} />
              <div className='flex flex-col text-xs'>
                <span className='text-[#86828C] mb-[6px]'>{searchData.top.objectType == 'artist' ? 'Nghệ sĩ' : ''}</span>
                <span className='text-sm font-semibold mb-[6px]'>{searchData.top.title || searchData.top.name}</span>
                {searchData.top.objectType === 'artist'
                  && <span className='text-[#86828C]'>{handleNumber(searchData.artists[0]?.totalFollow)}K quan tâm</span>}
              </div>
            </div>
          }
          {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
            <div key={item.encodeId} className='flex-1 bg-[#231B2E] rounded-md'>
              {/* không play được -> incorrect signal */}
              <SongItem
                thumbnail={item.thumbnail}
                sid={item.sid}
                title={item.title}
                artist={item.artistsNames}
                size={"w-[84px] h-[84px]"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold my-5'>Bài Hát</h3>
          <div className='flex gap-2 text-[#86818C]'>
            <span className='text-xs text-[#86818C]'>TẤT CẢ </span>
            <FcNext color='#86818C' />
          </div>
        </div>
        <div className='flex justify-between items-center flex-wrap w-full gap-4'>
          {searchData?.songs?.slice(0, 6).map(item => (
            <div key={item.encodeId} className='flex-auto w-[45%] justify-between'>
              <List
                songData={item}
                isHideAlbum
                isHideNode
              />
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold my-5'>Playlist/Album</h3>
          <div className='flex gap-2 text-[#86818C]'>
            <span className='text-xs text-[#86818C]'>TẤT CẢ </span>
            <FcNext color='#86818C' />
          </div>
        </div>
        <div className='flex justify-between items-start flex-wrap w-full gap-4'>
          {searchData?.playlists?.filter((i, index) => index < 4)?.map(item => (
            // <div key={item.encodeId} className='flex-auto w-[45%] justify-between'>
            <TopItem
              key={item.encodeId}
              title={item.title}
              link={item.link}
              thumbnailM={item.thumbnailM}
            />
            // </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold my-5'>Nghệ Sĩ</h3>
        </div>
        <div className='flex justify-between items-start flex-wrap w-full gap-4'>
          {searchData?.artists?.filter((i, index) => index < 4)?.map(item => (
            <Artist
              key={item.id}
              title={item.name}
              image={item.thumbnailM}
              follower={item.totalFollow}
              link={item.link}
            />
          ))}
        </div>
      </div>

      <div className='h-[90px] w-full'></div>
    </div>
  )
}

export default SearchAll