import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import path from '../../ultis/path';
import { ChangePassword, ChangeAvatar } from '../../components';


const UserInfo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userNow, users } = useSelector(state => state.music)
    const [change, setChange] = useState(false)
    { !userNow && navigate(path.PUBLIC) }

    const { currentWidth } = useSelector(state => state.app)
    return (
        <div className={`${currentWidth <= 480 ? ' px-[19px] mt-4' : currentWidth <= 1024 ? 'px-[39px] mt-8' : 'px-[59px] mt-12'} 
    flex flex-col gap-5`}>
            <div className='flex gap-5'>
                <button
                    onClick={() => setChange(false)}
                    className={`${change == false ? 'bg-[#3B1556]' : 'bg-[#9B4DE0]'} 
                hover:bg-[#3B1556] text-white font-bold py-2 px-4 rounded`}>                
                Thay đổi mật khẩu
                </button>
                <button
                    onClick={() => setChange(true)}
                    className={`${change == true ? 'bg-[#3B1556]' : 'bg-[#9B4DE0]'} 
                hover:bg-[#3B1556] text-white font-bold py-2 px-4 rounded`}>
                    Thay đổi ảnh đại diện
                </button>
            </div>
            <div>
                {change == false
                    ? <ChangePassword />
                    : change == true
                        ? <ChangeAvatar />
                        : ''}
            </div>
        </div>
    )
}

export default UserInfo