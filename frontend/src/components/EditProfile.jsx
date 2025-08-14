import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [gender, setGender] = useState(user.gender || "");
    const [age, setAge] = useState(user.age || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            // const res = await axios.patch(BASE_URL + "/profile/edit",
            //     { firstName, lastName, about, photoUrl, gender, age, skills },
            //     { withCredentials: true }
            // )
            const res = await axios.post(BASE_URL + "/profile/edit",
                { firstName, lastName, about, photoUrl, gender, age, skills },
                { withCredentials: true }
            );

            console.log(res?.data?.data);
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data || err.message);
        }
    }

    return (
        <div className='flex justify-center my-10'>
            <div>
                <div className="card bg-base-300 w-96 shadow-sm">

                    <div className="card-body">
                        <h1 className="card-title justify-center">Edit Profile</h1>
                        <fieldset className="fieldset my-4">

                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />

                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />

                            <legend className="fieldset-legend">About</legend>
                            <input type="text" className="input" value={about}
                                onChange={(e) => setAbout(e.target.value)} />

                            <legend className="fieldset-legend">Photo URL</legend>
                            <input type="text" className="input" value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)} />

                            <legend className="fieldset-legend">Gender</legend>
                            <input type="text" className="input" value={gender}
                                onChange={(e) => setGender(e.target.value)} />

                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" className="input" value={age}
                                onChange={(e) => setAge(e.target.value)} />

                            <legend className="fieldset-legend">Skills</legend>
                            <input type="text" className="input" value={skills}
                                onChange={(e) => setSkills(e.target.value)} />


                        </fieldset>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully</span>
                </div>
            </div>}

            <UserCard user={{ firstName, lastName, about, photoUrl, gender, age, skills }} />
        </div>
    )
}

export default EditProfile


