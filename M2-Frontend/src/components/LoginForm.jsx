import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/action";

const LoginForm = () => {
    const dispatch = useDispatch();
    const userNow = useSelector(state => state.userNow);
  
    useEffect(() => {
      dispatch(actions.setUserNow("v"));
      dispatch(actions.setUsers("v"));
    }, []);
  
    useEffect(() => {
      console.log(userNow);
    }, [userNow]);
  return (
    <div className=''>
LOGIN
    </div>
  )
}

export default LoginForm