import logo from './logo.svg';
import './App.css';
import { Home, Login, Public, Album, WeekRank, Search, SearchSong, SearchPlaylist, SearchAll, 
  ZingChart, Singer, New, TopFull, Admin } from "./containers/public/";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import path from './ultis/path';
import * as action from "./store/action"
import { useEffect, useState } from 'react';
import UserInfo from './containers/public/UserInfo';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getHome())
    dispatch(action.getTop100())
  }, [])
  // lấy width lần đầu
  const [curWidth, setCurWidth] = useState(window.innerWidth)


  // set Width khi resize
  const setWidth = (e) => {
    setCurWidth(e.target.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', setWidth)
    return () => {
      window.removeEventListener('resize', setWidth)
    }
  }, [])
  // truyền width cho các page
  useEffect(() => {
    dispatch(action.setCurrentWidth(curWidth))
  }, [curWidth])
  // console.log(curWidth);
  return (
    <>
      <div className=''>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.USER} element={<UserInfo />} />
            <Route path={path.ADMIN} element={<Admin />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank />} />
            <Route path={path.ZING_CHART} element={<ZingChart />} />
            <Route path={path.NEW_RELEASE} element={<New />} />
            <Route path={path.TOP_100} element={<TopFull />} />
            <Route path={path.HOME__SINGER} element={<Singer />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSong />} />
              <Route path={path.PLAYLIST__SEARCH} element={<SearchPlaylist />} />
            </Route>



            <Route path='home' element={<Home />} />

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
