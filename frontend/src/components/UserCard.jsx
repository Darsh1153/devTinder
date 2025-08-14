import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import axios from "axios";

const UserCard = ({user}) => {
    if (!user) return null;
    const { _id, firstName, lastName, about, photoUrl, age, skills } = user;

    const dispatch = useDispatch();
    
    const handleRequest = async (status, id) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + id, {}, {withCredentials: true});
            dispatch(removeFeed(id));
        }
        catch(err){
            console.error("Error: ", err.message);
        }
    }

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={user?.photoUrl}
                        alt="user-photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.firstName} {user.lastName}</h2>
                    <p>{user?.about}</p>
                    <div>{user?.age}, {user?.gender}</div>
                    <div>{user?.skills}</div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleRequest("ignored", _id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleRequest("interested", _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
