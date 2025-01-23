import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sid : "",
    usn:"",
    name : "",
    email : "",
    department_id:"",
    department_name:"",
    counsellor_id:"",
    counsellor_name:"",
    username:"",
    token : "",
  }
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser : (state,action)=>{
          state.sid = action.payload.sid
          state.usn = action.payload.usn
          state.name = action.payload.name 
          state.email = action.payload.email 
          state.department_id = action.payload.department_id
          state.department_name = action.payload.department_name
          state.counsellor_id = action.payload.counsellor_id
          state.counsellor_name = action.payload.counsellor_name
          state.username = action.payload.username

      },
      setToken : (state,action)=>{
          state.token = action.payload
      },
      logout : (state,action)=>{
        state.sid = ""
        state.usn = ""
        state.name = ""
        state.department_id = ""
        state.counsellor_id = ""
         state.department_name = ""
        state.counsellor_name = ""
        state.username = ""
        state.token=""
      }
    },
  })
  
  export const { setUser, setToken,logout } = userSlice.actions
  
  export default userSlice.reducer