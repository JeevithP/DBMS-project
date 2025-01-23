import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cid: "",
  name: "",
  username: "",
  email:"",
  department: "",
  token: "",
};

export const counsellorSlice = createSlice({
  name: "counsellor",
  initialState,
  reducers: {
    setCounsellor: (state, action) => {
      state.cid = action.payload.cid;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.department = action.payload.department;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logoutCounsellor: (state) => {
      state.cid = "";
      state.name = "";
      state.username = "";
      state.department= "";
      state.token = "";
      state.email ="";
    },
  },
});

export const { setCounsellor, setToken, logoutCounsellor } = counsellorSlice.actions;

export default counsellorSlice.reducer;
