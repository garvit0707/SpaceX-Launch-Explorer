import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    launches: null,
    launchpad: null,
    loading: false,
    error: null,
};

export const fetchAllLaunches = () => {
  "launchpad/fetchAllLaunches",
    async () => {
      try {
        const res = await fetch("https://api.spacexdata.com/v5/launches");
        if (!res.ok) throw new Error("Failed to Fetch launches");
        const data = await res.json();
        return data.sort(
        (a, b) => new Date(b.date_utc) - new Date(a.date_utc)
      );
      } catch (error) {
        console.log("Error has been caught!!", error);
      }
    };
};

export const fetchLaunchpadDetails = createAsyncThunk(
  "launchpad/fetchDetails",
  async (launched) => {
    try {
      const res = await fetch(
        `https://api.spacexdata.com/v4/launchpads/${launched}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error caught!!", error);
    }
  }
);

export const LaunchpadSlice = () => ({
  name: "launchpad",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllLaunches.pending, (state)=>{
            state.loading = true
            state.error = null;
        })
        .addCase(fetchAllLaunches.fulfilled, (state,action)=>{
            state.loading = false
            action.launches = action.payload
        })
        .addCase(fetchAllLaunches.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload || "Something went wrong here!"
        })


        // for detailed page content fetchLaunchpadDetails

      .addCase(fetchLaunchpadDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaunchpadDetails.fulfilled, (state, action) => {
        (state.loading = false); 
        (state.launchpad = action.payload);
      })
      .addCase(fetchLaunchpadDetails.rejected, (state, action) => {
        (state.loading = false), 
        (state.error = action.payload);
      });
  },
});

export default LaunchpadSlice.reducer;
