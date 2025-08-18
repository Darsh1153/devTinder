import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

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

  const signUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">

        <div className="card-body">
          <h1 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h1>
          <fieldset className="fieldset my-4">

            {!isLoginForm && <><legend className="fieldset-legend">First Name</legend>
              <input type="text" className="input" value={firstName} placeholder="Email ID"
                onChange={(e) => setFirstName(e.target.value)} />

              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" className="input" value={lastName} placeholder="Password"
                onChange={(e) => setLastName(e.target.value)} /> </>}

            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" className="input" value={emailId} placeholder="Email ID"
              onChange={(e) => setEmailId(e.target.value)} />

            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" value={password} placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />

            <p className='cursor-pointer' onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New user? Sign up here" : "Existing user, login here"}</p>

            <p className='text-red-500'>{error}</p>

          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? login : signUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
