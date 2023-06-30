import React from 'react';
import icons from "../ultis/icons";
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import path from '../ultis/path';
import * as actions from "../store/action";
import Dropdown from 'react-bootstrap/Dropdown';



const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons;

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { currentWidth } = useSelector(state => state.app)
    const { userNow, users } = useSelector(state => state.music)

    const handleLogout = () => {
        dispatch(actions.setUserNow(''));
        navigate(path.PUBLIC)
    }
    const avatarURL = users?.find(user => user.username == userNow)?.avatarURL
    // console.log(avatarURL);
    return (
        <div className='flex justify-between items-center w-full font-medium py-[14px] gap-3'>
            <div className='flex items-center gap-6 w-[80%] justify-between'>
                {/* <div className='flex gap-4 color-[#504A59]'>
                    <span><HiArrowNarrowLeft size={24} color='#504A59' /></span>
                    <span><HiArrowNarrowRight size={24} color='#504A59' /></span>
                </div> */}
                <div className={`${currentWidth <= 480 ? '' : currentWidth <= 768 ? 'w-[75%]' : 'w-full'}`}>
                    <Search />
                </div>
            </div>
            {!userNow
                ? <Link to={path.LOGIN} className={`w-[125px] flex justify-between rounded-l-full rounded-r-full text-sm font-semibold bg-[#9B4DE0] hover:text-[#E5E5E5] py-2`}>
                    <span className='m-auto cursor-pointer'>Đăng nhập</span>
                </Link>
                : <Dropdown className={`w-1/5 z-30 flex items-center justify-between text-sm font-semibold hover:text-[#E5E5E5] py-2`}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='flex items-center gap-3'>
                        {currentWidth > 768 && <span>Xin chào, {userNow}</span>}

                        <img src={avatarURL} alt=""
                            className='w-10 h-10 object-cover rounded-full ' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="" >
                            <div className='py-2 my-2 bg-[#9B4DE0] w-[125px] mr-[-25px] mt-[-15px] flex justify-between rounded-l-full rounded-r-full'>
                                <span onClick={handleLogout}
                                    className='m-auto cursor-pointer'>Đăng xuất</span>
                            </div>
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>



            }



        </div>
    )
}

export default Header