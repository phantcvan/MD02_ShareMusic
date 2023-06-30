import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/action";


const ChangePassword = () => {
  const dispatch = useDispatch()
  const { users, userNow } = useSelector(state => state.music)
  const [mess, setMess] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const passNow = users?.find(user => user.username == userNow).password;
    if (passNow != oldPassword) {
      setMess("Mật khẩu không đúng, hãy nhập lại!")
      setIsSuccess(false)
      return
    }
    if (newPassword != newPasswordConfirm) {
      setMess("Mật khẩu không trùng khớp, hãy nhập lại!")
      setIsSuccess(false)
      return
    }
    if (passNow == oldPassword) {
      dispatch(actions.updatePassword(userNow, newPassword));
      setMess("Mật khẩu được cập nhật thành công!")
      setIsSuccess(true)
    }
  }

  return (
    <div className='flex justify-between items-center p-4 gap-3 '>
      <form action="" onSubmit={handleSubmit}>
        <div className='flex flex-col pb-[10px]'>
          <div className='flex items-center w-[50vw]'>
            <label className='text-md font-semibold w-1/4' htmlFor="email">
              Mật khẩu hiện tại
            </label>
            <input
              className={`outline-none rounded-sm text-sm py-[10px] px-[5px] w-4/5 mt-[10px] 
            mr-[5px] bg-[#34224f]`}
              value={oldPassword}
              placeholder="Nhập mật khẩu hiện tại..."
              type="password"
              id="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center w-[50vw]'>
            <label className='text-md font-semibold w-1/4' htmlFor="email">
              Mật khẩu cập nhật
            </label>
            <input
              className={`outline-none rounded-sm text-sm py-[10px] px-[5px] w-4/5 mt-[10px] 
            mr-[5px] bg-[#34224f]`}
              value={newPassword}
              placeholder="Nhập mật khẩu mới..."
              type="password"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center w-[50vw]'>
            <label className='text-md font-semibold w-1/4' htmlFor="email">
              Nhập lại mật khẩu
            </label>
            <input
              className={`outline-none rounded-sm text-sm py-[10px] px-[5px] w-4/5 mt-[10px] 
            mr-[5px] bg-[#34224f]`}
              value={newPasswordConfirm}
              placeholder="Nhập lại mật khẩu..."
              type="password"
              id="newPasswordConfirm"
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          // ref={btnEnterRef}
          className={`items-center p-[10px]`}
        >
          <div className='w-full m-auto flex flex-col px-2'>
            <span className={`${isSuccess ? 'text-[#9B4DE0]' : 'text-red-500'} font-semibold`}>{mess}</span>
            {!isSuccess && <span className='bg-[#9b4de0] font-semibold py-2 px-4 rounded-l-full rounded-r-full text-lg m-auto'>
              Cập nhật
            </span>}
          </div>
        </button>

      </form>
    </div >
  )
}

export default ChangePassword