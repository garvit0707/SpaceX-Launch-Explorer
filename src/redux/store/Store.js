import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Slice/UserSlice";
import launchpadReducer from "../Slice/LaunchpadSlice";

export const store = configureStore({
  reducer: {
    user : userReducer,
    launchpad: launchpadReducer,
  },
})
