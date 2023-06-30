import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import path from '../../ultis/path';
import { ListUser } from '../../components';
import icons from "../../ultis/icons";

const { FiSearch, AiOutlineClose } = icons;

const Admin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSearch, setIsSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { userNow, users } = useSelector(state => state.music)
  const { currentWidth } = useSelector(state => state.app)

  const levelUser = users?.find(user => user.username == userNow)?.level
  if (levelUser > 3 || levelUser == undefined) {
    navigate(path.PUBLIC)
    return
  }
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      console.log(e.keyCode);
      setIsSearch(true)
    }
    console.log(isSearch);
  }
  const handleClose = () => {
    setKeyword("")
    setIsSearch(false)
  }


  return (
    <div className={`${currentWidth <= 480 ? ' px-[19px] mt-4' : currentWidth <= 1024 ? 'px-[39px] mt-8' : 'px-[59px] mt-12'} 
    flex flex-col gap-5`}>
      <h3 className='text-[24px] font-bold'>QUẢN TRỊ NGƯỜI DÙNG</h3>
      <div className='m-auto w-full flex flex-col mx-3'>
        <div className='w-full flex relative items-center'>
          {keyword && <span onClick={handleClose} className='absolute right-3 cursor-pointer'><AiOutlineClose size={18} /></span>}
          <span className='h-10 pl-4 flex items-center justify-center rounded-l-[20px] bg-[#2F2739]'
            onClick={() => setIsSearch(true)}>
            <FiSearch size={20} />
          </span>
          <input
            type="text"
            className='outline-none w-full bg-[#2F2739] px-4 py-2 rounded-r-[20px] h-10'
            placeholder='Nhập tên người dùng hoặc cấp quản trị...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        {!isSearch
          ? users?.map((item, index) => (
            <div className='gap-3'>
              <ListUser
                id={index + 1}
                avatar={item.avatarURL}
                username={item.username}
                email={item.email}
                level={item.level}
              />
            </div>
          ))
          : users?.filter((user) => user.username.includes(keyword) || user.level === keyword).map((item, index) => (
            <div className='gap-3'>
              <ListUser
                id={index + 1}
                avatar={item.avatarURL}
                username={item.username}
                email={item.email}
                level={item.level}
              />
            </div>
          ))}

      </div>

    </div>
  )
}

export default Admin