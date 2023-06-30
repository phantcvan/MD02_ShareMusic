import React, { memo, useEffect, useRef, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import SongItem from './SongItem';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import path from '../ultis/path';
import icons from "../ultis/icons";

const { BsPlayCircle } = icons

const ChartItem = () => {
    const [data, setData] = useState(null);
    const { chart, rank, currentWidth } = useSelector(state => state.app)
    const chartRef = useRef()
    const [songId, setSongId] = useState(0)
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    })
    const [selected, setSelected] = useState(null)
    const options = {
        responsive: true,
        pointRadius: 0,
        // maintainAspectRatio: false,
        aspectRatio: 4,
        scales: {
            x: {
                ticks: { color: "#9C9B9D" },
                grid: { color: 'transparent' }
            },
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.2)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [2, 4] }
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return
                    if (tooltip.opacity == 0) {
                        if (tooltipState.opacity != 0) setTooltipState(pre => ({ ...pre, opacity: 0 }))
                        return
                    }
                    const counters = []
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 == 0)?.map(item => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        })
                    }
                    const tooltipBody = +tooltip.body[0]?.lines[0]?.replace(',', '') * 1000
                    const rs = counters.find(i => i.data.includes(tooltipBody))
                    setSelected(rs?.encodeId)
                    setSongId(rank.findIndex(obj => obj.encodeId === rs.encodeId))
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    }
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                },
            }
        },
        hover: {
            mode: "dataset",
            intersect: false,
        }
    }

    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 == 1)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 == 0)?.map(item => item.counter),
                    borderColor: i == 0 ? '#4A90E2' : i == 1 ? '#27BD9C' : '#E35050',
                    tension: 0.3,
                    borderWidth: 2,
                    pointHoverRadius: 4,
                    pointBackgroundColor: 'white',
                    pointHitRadius: 4,
                    pointBorderColor: i == 0 ? '#4A90E2' : i == 1 ? '#27BD9C' : '#E35050',
                    animation: false,
                    pointHoverBorderWidth: 4,
                })
            }
        }
        setData({ labels, datasets })
    }, [chart])

    return (
        <div className={`${currentWidth <= 480 ? 'px-[19px] mt-4' : currentWidth <= 1024 ? 'px-[39px] mt-8' : 'px-[59px] mt-12'}
        w-full rounded-md`}>
            <div className={`${currentWidth <= 480 ? 'p-3' : currentWidth <= 768 ? 'p-4' : 'p-5'} bg-[#3B1556] rounded-md flex flex-col`}>
                <Link to={path.ZING_CHART} className='flex jb items-center gap-2 mb-4'>
                    <h3 className='text-2xl font-bold'>#zingchart</h3>
                    <span className=''><BsPlayCircle size={24} /></span>
                </Link>
                {/* <div className='flex flex-auto items-center justify-between gap-3'> */}

                <div className='w-full relative h-full'>
                    {data && <Line data={data} options={options} ref={chartRef} />}
                    <div className='tooltip'
                        style={{
                            top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity,
                            position: 'absolute',
                        }}>
                        <SongItem
                            thumbnail={rank?.find(i => i.encodeId == selected)?.thumbnail}
                            title={rank?.find(i => i.encodeId == selected)?.title}
                            artist={rank?.find(i => i.encodeId == selected)?.artistsNames}
                            sid={rank?.find(i => i.encodeId == selected)?.encodeId}
                            style={`${songId == 0 ? "bg-[#4A90E2]" : songId == 1 ? "bg-[#27BD9C]" : "bg-[#E35050]"}`}
                            styleArt={`${songId == 0 ? "text-[#C7DDF6]" : songId == 1 ? "text-[#BDEBE1]" : "text-[#F7D0D0]"}`}
                        />
                    </div>
                    {/* </div> */}
                </div>
                <div className='mt-3 w-full'>
                    {rank?.filter((i, index) => index < 3)?.map((item, index) => (
                        <SongItem
                            key={item.encodeId}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artist={item.artistsNames}
                            sid={item.encodeId}
                            order={index + 1}
                            percent={Math.round(item.score / chart?.totalScore * 100)}
                            style="hover:bg-[#725685] bg-[#46255C] my-3"
                        />
                    ))}
                </div>
                <Link
                    to={path.ZING_CHART}
                    className='px-4 py-1 rounded-l-full rounded-r-full border border-white m-auto w-fit'
                >
                    Xem thêm
                </Link>
            </div>
        </div>
    )
}

export default memo(ChartItem)