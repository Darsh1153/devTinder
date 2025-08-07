import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [emailId, setEmailId] = useState("darshan@gmail.com");
  const [password, setPassword] = useState("Darsh@123");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:9000/login", {
        emailId: emailId,
        password: password,
      }, {withCredentials: true})
      // console.log(res);
      dispatch(addUser(res.data));
      navigate("/feed");
    }

    catch (err) {
      console.error("Error while fetching" + err);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-1/3 shadow-sm">
        <div className="card-body flex">
          <h1 className="card-title justify-center">Login</h1>
          <div className='flex justify-center w-full my-5'>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input type="text" className="input"
                onChange={(e) => setEmailId(e.target.value)} />

              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input"
                onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
