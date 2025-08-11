import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("darshan@gmail.com");
  const [password, setPassword] = useState("Darsh@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId: emailId,
        password: password,
      }, { withCredentials: true })
      // console.log(res.data);
      // Check if the response contains valid user data
      if (res?.data?.firstName) {
        dispatch(addUser(res.data));
        return navigate("/");  // Redirect on successful login
      } else {
        setError("Invalid credentials, please try again.");
      }

    }
    catch (err) {
      // Check for an actual error object and handle accordingly
      if (err?.response?.data) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Network error or invalid response");
      }
      console.error("Error while fetching: ", err?.message);
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
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
