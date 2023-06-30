import React, { useEffect, useState } from 'react';
import { apiGetArtist } from "../../apis";
import { useSelector } from 'react-redux';
import { SectionItem } from "../../components";

const SearchPlaylist = () => {
  const { searchData } = useSelector(state => state.music)
  const { currentWidth } = useSelector(state => state.app)
  const [playlist, setPlaylist] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(searchData?.top?.alias)
      if (res.data.err == 0) {
        setPlaylist(res.data.data.sections[1])
      }
    }
    fetch()
  }, [searchData])
  return (
    <div className='w-full flex-col flex gap-8 px-11'>
      <h3 className='font-semibold pt-4 text-lg '>Playlist/Album</h3>
      <div className='flex items-start justify-start flex-wrap w-full'>
        {playlist?.items?.length > 0 && playlist.items?.map(item => (
          <div className={`${currentWidth <= 480 ? 'w-1/3' : currentWidth <= 768 ? 'w-1/4' : 'w-1/5'} py-3`}>
            <SectionItem
              key={item.encodeId}
              title={item.title}
              link={item.link}
              thumbnailM={item.thumbnailM}
              isSearch
            // sortDescription={item.sortDescription} 
            />
          </div>
        ))}

      </div>

    </div>
  )
}

export default SearchPlaylist