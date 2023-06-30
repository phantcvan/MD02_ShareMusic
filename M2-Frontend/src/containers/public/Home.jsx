import React, { useEffect } from 'react';
import { NewRelease, Section, Slider, Top, ChartItem } from '../../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentWidth } from '../../store/action';



function Home(props) {
    const { melody, chill, energy, top100, hot, weekChart, currentWidth } = useSelector(state => state.app)

    return (
        <div className='overflow-y-auto'>
            <Slider />
            <NewRelease />
            <Section data={melody} />
            <Section data={chill} />
            <Section data={energy} />
            <ChartItem />
            <div className={`flex items-center w-full ${currentWidth <= 480 ? 'px-[14px] mt-4' : currentWidth <= 768 ? 'px-[29px] mt-8' : 'px-[43px] mt-12'}`}>
                {weekChart?.map(item => (
                    <div key={item.link} className='flex-1 px-4'>
                        <img src={item.cover} alt="cover" className='w-full object-cover rounded-md' />
                    </div>
                ))}
            </div>
            <Top data={top100} />
            <Top data={hot} />
        </div>
    );
}

export default Home;