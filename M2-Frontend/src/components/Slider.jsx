import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArrSlider } from '../ultis/fn';
import * as actions from '../store/action';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
    const { banner, currentWidth } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    // ainimation for banner
    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 3
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1)
            for (let i = 0; i < sliderEls.length; i++) {
                // Delete classnames (css)
                sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20')
                sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10')
                sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10')

                // Hide or Show images
                if (list.some(item => item === i)) {
                    sliderEls[i].style.cssText = `display: block`
                } else {
                    sliderEls[i].style.cssText = `display: none`
                }
            }
            // Add animation by adding classnames
            list.forEach(item => {
                if (item === max) {
                    sliderEls[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20')
                } else if (item === min) {
                    sliderEls[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10')
                } else {
                    sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10')
                }
            })
            min = (min === sliderEls.length - 1) ? 0 : min + 1
            max = (max === sliderEls.length - 1) ? 0 : max + 1
        }, 4000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    const handleClickBanner = (item) => {
        if (item?.type == 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))
            dispatch(actions.setPlaylist(null))
        } else if (item?.type == 3 || item?.type == 4) {
            const albumPath = item?.link?.split('.')[0]
            navigate(albumPath)
        } else {
            dispatch(actions.setPlaylist(null))
        }
    }

    return (
        <div className={`${currentWidth <= 480 ? 'px-[19px]' : currentWidth <= 768 ? 'px-[39px]' : 'px-[59px]'} w-full overflow-hidden`}>
            <div className={`${currentWidth <= 480 ? 'gap-5 pt-3' : currentWidth <= 768 ? 'gap-9 pt-8' : 'gap-[50px] pt-8'} flex w-full`}>
                {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        onClick={() => handleClickBanner(item)}
                        className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <= 2 ? 'block' : 'hidden'}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Slider