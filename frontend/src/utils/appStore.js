import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const userSlice = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default userSlice;