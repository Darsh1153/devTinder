import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = async () => {
    try {
      const res = await axios.get(BASE_URL+"/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    }catch(err){
      navigate("/login");
    }
  }
  useEffect(() => {
    userData();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Body
