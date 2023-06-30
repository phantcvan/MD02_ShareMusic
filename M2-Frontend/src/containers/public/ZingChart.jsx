import React, { useEffect, useState, useRef } from 'react'
import { apiGetChartHome } from '../../apis';
import path from '../../ultis/path';
import icons from "../../ultis/icons"
import { Link } from 'react-router-dom';
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { SongItem, List } from '../../components';
import _ from "lodash"
import { useDispatch, useSelector } from 'react-redux';

const { BsPlayCircle } = icons


const ZingChart = () => {
  const { currentWidth } = useSelector(state => state.app)
  const [chartData, setChartData] = useState(null)
  const [viewMore, setViewMore] = useState(false)
  const [data, setData] = useState(null)
  const [songId, setSongId] = useState(0)

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await apiGetChartHome()
      if (response.data.err == 0) setChartData(response.data.data)
    }
    fetchChartData()
  }, [])

  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  })
  const [selected, setSelected] = useState(null)
  const chartRef = useRef()

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
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
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
              data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 == 0)?.map(item => item.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
            })
          }
          const tooltipBody = +tooltip.body[0]?.lines[0]?.replace(',', '') * 1000
          const rs = counters.find(i => i.data.includes(tooltipBody))
          setSelected(rs?.encodeId)
          setSongId(chartData?.RTChart?.items?.findIndex(obj => obj.encodeId === rs.encodeId))
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
    const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 == 1)?.map(item => `${item.hour}:00`)
    const datasets = []
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 == 0)?.map(item => item.counter),
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
  }, [chartData])

  // console.log("chartData", chartData);
  return (
    <div className={`${currentWidth <= 480 ? 'px-[19px]' : currentWidth <= 1024 ? 'px-[39px]' : 'px-[59px]'}`}>
      <div className='w-full h-[70px]'>
        <div>
          <div className='flex jb items-center gap-2 mb-4'>
            <h3 className='text-4xl font-bold'>#zingchart </h3>
            <span className=''><BsPlayCircle size={30} /></span>
          </div>

        </div>
      </div>
      <div className='w-full relative h-full'>
        {data && <Line data={data} options={options} ref={chartRef} />}
        <div className='tooltip'
          style={{
            top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity,
            position: 'absolute',
          }}>
          <SongItem
            thumbnail={chartData?.RTChart?.items?.find(i => i.encodeId == selected)?.thumbnail}
            title={chartData?.RTChart?.items?.find(i => i.encodeId == selected)?.title}
            artist={chartData?.RTChart?.items?.find(i => i.encodeId == selected)?.artistsNames}
            sid={chartData?.RTChart?.items?.find(i => i.encodeId == selected)?.encodeId}
            style={`${songId == 0 ? "bg-[#4A90E2]" : songId == 1 ? "bg-[#27BD9C]" : "bg-[#E35050]"}`}
            styleArt={`${songId == 0 ? "text-[#C7DDF6]" : songId == 1 ? "text-[#BDEBE1]" : "text-[#F7D0D0]"}`}
          />
        </div>
        {/* </div> */}
      </div>
      {viewMore ?
        <div className='mt-10'>
          {chartData?.RTChart?.items?.map((item, index) => (
            <List
              songData={item}
              key={item.encodeId}
              order={index + 1}
              isHideNode
            />
          ))}
        </div>
        : <div className='mt-10'>
          {chartData?.RTChart?.items?.filter((i, index) => index < 10)?.map((item, index) => (
            <List
              songData={item}
              key={item.encodeId}
              order={index + 1}
              isHideNode
              isHideAlbum={currentWidth <= 480 ? true : false}
            />
          ))}
        </div>
      }
      {viewMore ? <div className='flex justify-between m-2 w-full'>
        <span className='rounded-r-full rounded-l-full p-2 m-auto border border-white cursor-pointer'
          onClick={() => setViewMore(false)}
        >
          Thu gọn
        </span>
      </div>
        : <div className='flex justify-between m-2 w-full'>
          <span className='rounded-r-full rounded-l-full p-2 m-auto border border-white cursor-pointer'
            onClick={() => setViewMore(true)}
          >
            Xem top 100
          </span>
        </div>}
      <div className='h-[10px]'></div>

    </div>
  )
}

export default ZingChart