import React, { useEffect } from 'react'
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      console.log(res.data);
      dispatch(addFeed(res.data));
    }catch(err){
      console.error(); 
    }

  }
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className='flex justify-center my-20'>
      {feed && <UserCard user={feed[4]} />}
    </div>
  )
}

export default Feed
