import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
        dispatch(addConnections(res.data));
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };

    fetchConnections();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">My Connections</h2>

      {Array.isArray(connections) && connections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {connections.map((conn) => {
            const otherUser =
              conn.fromUserId._id === currentUser._id ? conn.toUserId : conn.fromUserId;

            return (
              <div
                key={conn._id}
                className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={otherUser.photoUrl}
                  alt={otherUser.firstName}
                  className="w-24 h-24 object-cover rounded-full border-4 border-blue-100 mb-4"
                />
                <p className="text-lg font-semibold text-gray-300">
                  {otherUser.firstName} {otherUser.lastName}
                </p>
                <p className="text-gray-600 text-center mt-2">{otherUser.about}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-6">No connections found</p>
      )}
    </div>
  );
};

export default Connections;
