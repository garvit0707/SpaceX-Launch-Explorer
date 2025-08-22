import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    name:"",
    email: "",
};


export const userSlice = createSlice({
    name: "user_detail",
    initialState,
    reducers:{
        saveUser: (state, action) => {
            const {name,email} = action.payload
            state.name = name;
            state.email = email;
            console.log("the saveuser slice is ",action?.payload)
        }
    }
})


export const {saveUser} = userSlice.actions;
export default userSlice.reducer;
