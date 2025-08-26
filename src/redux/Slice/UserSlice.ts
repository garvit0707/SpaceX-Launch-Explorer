import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api/Api";
import { act } from "react";

interface UserState {
    users: any[],
    loading: Boolean,
    error: string | null
}


const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

export const createUser = createAsyncThunk(
    "users/createUser",
    async (payload:{name:string,email:string})=>{
        try {
            const response = await api.post("users", payload);
            return response.data
        } catch (error: any) {
            console.log("the error has been caught", error)   
        }
    }
)

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id) =>{
        try {
            await api.delete(`users/${id}`);
            return id; 
        } catch (error) {
            console.log("error has been caught!",error)
        }
    }
);

export const fetchUsers = createAsyncThunk(
    "users/fetchAll",
    async () =>{
        const res = await api.get("users")
        return res.data
    }
)

export const editUsers = createAsyncThunk(
    "users/editUser",
    async (payload: {name: string,email: string,id: number})=>{
        const {id, name,email} = payload
        try {
            const response = await api.put(`users/${id}`,payload)
            return response.data
        } catch (error) {
            console.log("error caught",error)
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        saveUser: (state, action) => {
            state.users.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createUser.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(createUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })

            // For adding the user we have 1 case

            .addCase(fetchUsers.rejected,(state,action)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.loading = false;
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
            // for deleting the userss
            .addCase(deleteUser.fulfilled,(state,action)=>{
                state.users = state.users.filter((u) => u.id !== action.payload)
            })
        
            // Edit User Cases
            .addCase(editUsers.pending,(state,action)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(editUsers.fulfilled,(state,action)=>{
                state.loading = false,
                state.users = state.users.map((u)=>{
                    u.id === action.payload.id ? action.payload: u
                });
            })
           .addCase(editUsers.rejected, (state,action)=>{
                state.loading = false,
                state.error = action.error.message || "Failed to edit user"
           })
     
        }

})

export const {saveUser} = userSlice.actions;
export default userSlice.reducer