import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    data: null,
    loading: false,
    error: null
};


export const fetchLaunchpadDetails = createAsyncThunk(
    "launchpad/fetchDetails",
    async (launched) => {
        try {
            const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${launched}`)
            const data  =  await res.json()
            return data
        } catch (error) {
            console.log("Error caught!!",error)
        }
    }
);



export const LaunchpadSlice =()=>({
    name: "launchpad",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchLaunchpadDetails.pending, (state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchLaunchpadDetails.fulfilled, (state,action)=>{
            state.loading = false,
            state.data = action.payload
        })
        .addCase(fetchLaunchpadDetails.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        });
    },
});

export default LaunchpadSlice.reducer;
