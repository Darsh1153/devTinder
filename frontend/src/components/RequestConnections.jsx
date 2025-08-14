import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.request);

  const fetchRequestConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/request/user/connections", { withCredentials: true });
      console.log(res.data);
      dispatch(addRequest(res.data));
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };

  useEffect(() => {
    fetchRequestConnection();
  }, []);

  const handleRequests = async (status, id) => {
    await axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, {withCredentials: true});
    dispatch(removeRequest(id));
  }

  if (!requests || requests.length === 0) return <div className="text-center mt-10">No requests found</div>;

  return (
    <div className="flex flex-col items-center gap-6 my-10">
      {requests.map((request) => {
        const { firstName, lastName, about, skills = [], photoUrl, gender, age } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex items-start gap-4 bg-white shadow-lg rounded-xl p-4 w-[500px] border border-gray-200 hover:shadow-xl transition"
          >
            {/* Profile Photo */}
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-20 h-20 rounded-full object-cover border border-gray-300"
            />

            {/* Info */}
            <div className="flex flex-col">
              <h2 className="font-bold text-xl text-gray-800">{firstName} {lastName}</h2>
              <p className="text-gray-600 text-sm">{gender}, {age} years</p>
              <p className="mt-1 text-gray-700">{about}</p>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-semibold">Skills:</span> {skills.length ? skills.join(", ") : "Not specified"}
              </p>

              {/* Buttons */}
              <div className="mt-3 flex gap-3">
                <button className="btn btn-outline btn-primary" onClick={() => handleRequests("rejected", request.fromUserId._id)}>Reject</button>
                <button className="btn btn-outline btn-secondary" onClick={() => handleRequests("accepted", request.fromUserId._id)}>Accept</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
