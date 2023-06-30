import React, { memo, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import icons from '../ultis/icons'

const { AiOutlineHeart, BsPlayCircle, BsThreeDots } = icons

const SectionItem = ({ link, title, data, thumbnailM, sortDescription, isSearch }) => {
  const navigate = useNavigate()
  const [isHover, setIsHover] = useState(false)
  const imageRef = useRef()


  return (
    <div
      onClick={() => {
        navigate(link?.split('.')[0], { state: { playAlbum: false } })
      }}
      className='flex gap-3 flex-1 text-sm px-4 justify-evenly flex-col cursor-pointer'
    >
      <div onMouseEnter={() => {
        setIsHover(true)
      }}
        onMouseLeave={() => {
          setIsHover(false)
        }}
        className='w-full relative overflow-hidden rounded-lg'
      >
        {isHover && <div className='absolute top-0 bottom-0 left-0 right-0 z-30 bg-overlay-30 rounded-lg
         flex items-center justify-center gap-3'>
          {/* <span><AiOutlineHeart size={24} /></span> */}
          <span onClick={(e) => {
            e.stopPropagation()
            navigate(link?.split('.')[0], { state: { playAlbum: true } })
          }}
          >
            <BsPlayCircle size={32} />
          </span>
          {/* <span><BsThreeDots size={24} /></span> */}
        </div>}
        <img
          src={thumbnailM} alt=""
          className={`w-full h-auto top-0 object-cover rounded-lg ${isHover ? 'animate-scale-up-img' : 'animate-scale-down-img'}`} />
      </div>
      <span className='text-[#86818C]' >
        {sortDescription?.length >= 100 ? `${sortDescription?.slice(0, 100)}...` : sortDescription}
      </span>
      <span className='font-semibold' >
        {isSearch ? title : ''}
      </span>
    </div>
  )
}

export default memo(SectionItem) 