import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("deepak@gmail.com");
  const [password, setPassword] = useState("Deepak@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      )

      console.log(res);
      dispatch(addUser(res.data));
      return navigate("/");
      
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">

        <div className="card-body">
          <h1 className="card-title justify-center">Login</h1>
          <fieldset className="fieldset my-4">

            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" className="input" value={emailId} placeholder="Email ID"
              onChange={(e) => setEmailId(e.target.value)} />

            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" value={password} placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />
            
            <p className='text-red-500'>{error}</p>

          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
