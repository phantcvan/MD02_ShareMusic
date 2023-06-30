import React from 'react';
import logo from "../assets/logo.svg";
import logoSm from "../assets/logo600.png";
import { sidebarMenu } from '../ultis/menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import path from "../ultis/path";
import { useSelector } from 'react-redux';


const notActiveStyle = 'py-3 px-[25px] text-[14px] font-medium text-[white] flex gap-3 items-center bg-[#231B2E]'
const activeStyle = 'py-3 px-[25px] text-[14px] font-bold text-[white] flex gap-3 items-center bg-[#3A3344]'
const notActiveStyleSm = 'py-3 px-[25px] flex gap-3 items-center bg-[#231B2E]'
const activeStyleSm = 'py-3 px-[25px] flex gap-3 items-center bg-[#3A3344]'
const SidebarLeft = () => {
  const navigate = useNavigate()
  const { currentWidth } = useSelector(state => state.app)
  const { userNow, users } = useSelector(state => state.music)
  // console.log("userNow",userNow);
  const level = users?.find(user => user.username == userNow)?.level
  return (
    <div className='bg-[#231B2E]'>
      {currentWidth <= 480
        ? <div className='w-fit'>
          <div className='w-15 h-[75px] px-2 py-3 flex justify-start m-auto' onClick={() => navigate(path.HOME)}>
            <img src={logoSm} alt="logo" className='w-full object-cover' />
          </div>
          <div className='flex flex-col '>
            {level <= 3
              ? sidebarMenu.map(item => (
                <NavLink
                  to={item.path}
                  key={item.path}
                  end={item.end}
                  className={({ isActive }) => isActive ? activeStyleSm : notActiveStyleSm}
                >
                  {item.icons}
                </NavLink>
              ))
              : userNow == null
                ? sidebarMenu.filter(menu => menu.path !== "admin" && menu.path !== "user-info").map(item => (
                  <NavLink
                    to={item.path}
                    key={item.path}
                    end={item.end}
                    className={({ isActive }) => isActive ? activeStyleSm : notActiveStyleSm}
                  >
                    {item.icons}
                  </NavLink>
                ))
                : sidebarMenu.filter(menu => menu.path !== "admin").map(item => (
                  <NavLink
                    to={item.path}
                    key={item.path}
                    end={item.end}
                    className={({ isActive }) => isActive ? activeStyleSm : notActiveStyleSm}
                  >
                    {item.icons}
                  </NavLink>
                ))}
          </div>
        </div>
        : currentWidth <= 768
          ? <div className='w-fit'>
            <div className='w-20 h-25 px-2 py-3 flex justify-start' onClick={() => navigate(path.HOME)}>
              <img src={logoSm} alt="logo" className='w-full object-cover' />
            </div>
            <div className='flex flex-col '>
              {level <= 3
                ? sidebarMenu.map(item => (
                  <NavLink
                    to={item.path}
                    key={item.path}
                    end={item.end}
                    className={({ isActive }) => isActive ? activeStyleSm : notActiveStyleSm}
                  >
                    {item.icons}
                  </NavLink>
                ))
                : userNow == null
                  ? sidebarMenu.filter(menu => menu.path !== "admin" && menu.path !== "user-info").map(item => (
                    <NavLink
                      to={item.path}
                      key={item.path}
                      end={item.end}
                      className={({ isActive }) => isActive ? activeStyleSm : notActiveStyleSm}
                    >
                      {item.icons}
                    </NavLink>
                  ))
                  : sidebarMenu.filter(menu => menu.path !== "admin").map(item => (
                    <NavLink
                      to={item.path}
                      key={item.path}
                      end={item.end}
                      className={({ isActive }) => isActive ? activeStyleSm : notActiveStyleSm}
                    >
                      {item.icons}
                    </NavLink>
                  ))
              }
            </div>
          </div>
          : <div className='flex flex-col h-full '>
            <div className='w-full h-[70px] px-4 py-6 flex justify-start' onClick={() => navigate(path.HOME)}>
              <img src={logo} alt="logo" className='w-[120px] h-10' />
            </div>
            <div className='flex flex-col '>
              {level <= 3
                ? sidebarMenu.map(item => (
                  <NavLink
                    to={item.path}
                    key={item.path}
                    end={item.end}
                    className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                  >
                    {item.icons}
                    <span>{item.text}</span>
                  </NavLink>
                ))
                : userNow == null
                  ? sidebarMenu.filter(menu => menu.path !== "admin" && menu.path !== "user-info")
                    .map(item => (
                      <NavLink
                        to={item.path}
                        key={item.path}
                        end={item.end}
                        className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                      >
                        {item.icons}
                        <span>{item.text}</span>
                      </NavLink>
                    ))
                  : sidebarMenu.filter(menu => menu.path !== "admin").map(item => (
                    <NavLink
                      to={item.path}
                      key={item.path}
                      end={item.end}
                      className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                    >
                      {item.icons}
                      <span>{item.text}</span>
                    </NavLink>
                  ))}

              {/* {userNow == 'admin'
              && <NavLink className={({ isActive }) => isActive ? activeStyle : notActiveStyle}>
                <span>Quản trị hệ thống</span>
                </NavLink>} */}
            </div>
          </div>

      }
    </div>
  )
}

export default SidebarLeft