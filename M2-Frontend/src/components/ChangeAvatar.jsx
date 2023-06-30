import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/action";
import { storage } from '../firebase'
import { useNavigate } from 'react-router';
import path from '../ultis/path';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

const ChangeAvatar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { users, userNow } = useSelector(state => state.music)
  const [mess, setMess] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  // State upload ảnh lên
  const [imageUpload, setImageUpload] = useState(null);
  // State lấy url ảnh về
  const [imageUrls, setImageUrls] = useState([]);


  // Tạo storage lưu trữ từ dịch vụ của firebase
  const imagesListRef = ref(storage, "images/");

  // Hàm upload ảnh
  const uploadFile = () => {
    console.log("up");
    if (imageUpload == null) return;
    setIsUpload(true)

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };


  // Lấy dữ liệu trả về từ firebase
  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);




  const handleUpdate = () => {
    const avatarURL = imageUrls[(imageUrls.length - 1)];
    dispatch(actions.updateAvatar(userNow, avatarURL));
    setMess("Cập nhật thành công")
    setIsSuccess(true)
    // setTimeout(() => {
    //   navigate(path.PUBLIC)
    // }, 1000);
  }
  // console.log(imageUrls);

  return (
    <div className='flex flex-col p-4 gap-3'>
      <input
        type='file'
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <div className='w-full my-3'>
        {!imageUpload &&
        <button onClick={uploadFile}
            className='bg-[#9b4de0] font-semibold py-2 px-4 rounded-l-full rounded-r-full text-lg m-auto w-[130px]'
          >
            Tải ảnh lên
          </button>
          }
          <img src={imageUrls[imageUrls.length-1]} alt="" />
        { (imageUpload && !isSuccess)
            ? <button onClick={handleUpdate}
              className='bg-[#9b4de0] font-semibold py-2 px-4 rounded-l-full rounded-r-full text-lg m-auto w-[120px]'
            >
              Cập nhật
            </button>
            : <span className={`${isSuccess ? 'text-[#9B4DE0]' : 'text-red-500'} font-semibold`}>{mess}</span>
        }
{/* 
        {imageUrls.map((url) => {
          return <img src={url} />;
        })} */}
      </div>
    </div >
  )
}

export default ChangeAvatar