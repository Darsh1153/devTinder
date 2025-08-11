import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);
    console.log(feed);

    const getData = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data));
        } catch (err) {
            console.error("ERROR");
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        !feed || feed.length === 0
            ? <h1>Loading...</h1>
            : <div className="flex justify-center my-10">
                <FeedCard user={feed[4]} />
            </div>
    )
}

export default Feed;