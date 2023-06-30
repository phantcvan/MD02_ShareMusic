import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/action";

const ListUser = ({ id, avatar, username, email, level }) => {
    const dispatch = useDispatch()
    const [selectedLevel, setSelectedLevel] = useState(level);
    const { users, userNow } = useSelector(state => state.music)
    const handleUpdateUser = () => {
        dispatch(actions.updateUser(username, selectedLevel));
    };
    const options = [
        { value: '2', label: 'SMod' },
        { value: '3', label: 'Mod' },
        { value: '4', label: 'User' },
        { value: '5', label: 'Banned' },
    ];
    const rankUser = level === 1 ? 'Admin' :  level === 2 ? 'Smod' : level === 3 ? 'Mod' : level === 4 ? 'User' : 'Banned'
    const levelUserNow = users.find(user => user.username == userNow).level
    return (
        <div className='flex justify-between items-center py-4 border-b border-[#231B2E] text-lg'>
            <div className='flex items-center w-[8%]'>
                <span className='text-3xl font-bold w-16 text-white'>{id}</span>
            </div>
            <div className='w-[10%]'>
                <img src={avatar} alt='' className='w-12 h-12 rounded-full' />
            </div>
            <div className='w-[15%] px-2'>
                <span className=' font-bold'>{username}</span>
            </div>
            <div className='flex-1 px-2'>
                <span className=''>{email}</span>
            </div>
            {(username == userNow || levelUserNow >= level)
                ? <div className='flex justify-between w-1/4'>
                    <span className=' font-semibold'>{rankUser}</span>
                    <div className='w-1/4'></div>
                </div>
                : <div className='flex justify-between w-1/3'>
                    <select
                        className='bg-[#170F23] hover:bg-[#2F2739] font-medium'
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        {options.filter((option) => option.value > levelUserNow).map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className='w-1/2'>
                        <button
                            onClick={handleUpdateUser}
                            className='bg-[#9B4DE0] hover:bg-[#3B1556] text-white font-bold py-2 px-4 rounded'>
                            Cập nhật
                        </button>
                    </div>
                </div>
            }
            <div>
            </div>
        </div>
    )
}


export default ListUser