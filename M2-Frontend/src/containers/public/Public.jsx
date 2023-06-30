import React from 'react'
import { Outlet } from 'react-router';
import { Header, Player, SidebarLeft, SidebarRight, Loading } from "../../components";
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';


const Public = () => {
    const [showRight, setShowRight] = useState(false)
    const { isLoading, currentWidth } = useSelector(state => state.app)
    const { recentSongs } = useSelector(state => state.music)

    return (
        <div className='w-full relative h-screen flex flex-col text-[white] '>
            <div className='w-full h-full flex flex-auto relative'>
                <div className={`${currentWidth <= 1024 ? 'w-fit' : 'w-[240px]'} h-full flex-none border border-[#170F23] bg-[#231B2E]`}>
                    <SidebarLeft />
                </div>
                <div className='flex relative flex-col flex-auto border border-[#170F23] overflow-y-auto'>
                    {isLoading && <div className='absolute  top-0 bottom-0 left-0 right-0 z-20 bg-main-200 flex items-center justify-center'>
                        <Loading />
                    </div>}
                    <div className={`${currentWidth <= 480 ? ' px-[19px]' : currentWidth <= 1024 ? 'px-[39px]' : 'px-[59px]'} h-[70px] flex-none items-center bg-main-300`}>
                        <Header />
                    </div>
                    <div className={`flex-auto w-full bg-main-300 ${recentSongs.length > 0 ? 'pb-28' : 'pb-2'}`}>
                        <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                    {/* <div className='w-full '></div> */}
                </div>
                {showRight &&
                    <div className='absolute top-[70px] right-0 bottom-0 h-full z-20 w-[329px] flex-none animate-slide-left bg-main-600'>
                        <SidebarRight />
                    </div>}

            </div>
            {recentSongs.length == 0
                ? <div> </div>
                : <div className={`${currentWidth <= 480 ? 'h-[70px]' : currentWidth <= 768 ? 'h-[80px]' : 'h-[90px]'} fixed bottom-0 left-0 right-0 bg-main-400 z-30 border border-[#2B2533]`}>
                    <Player setShowRight={setShowRight} /> </div>}
        </div>
    )
}

export default Public;
