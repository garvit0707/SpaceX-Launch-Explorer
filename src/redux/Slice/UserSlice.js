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
        }
    }
})

export const {saveUser} = userSlice.actions;
export default userSlice.reducer;
