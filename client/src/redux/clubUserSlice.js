import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cid: "",
  name: "",
  email: "",
  token: "",
};

export const clubUserSlice = createSlice({
  name: "clubUser",
  initialState,
  reducers: {
    setClubUser: (state, action) => {
      // console.log(action.payload.username)
      state.cid = action.payload.cid;
      state.name = action.payload.name;
      state.email = action.payload.username;
    },
    setClubToken: (state, action) => {
      state.token = action.payload;
    },
    logoutClubUser: (state) => {
      state.cid = "";
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { setClubUser, setClubToken, logoutClubUser } = clubUserSlice.actions;

export default clubUserSlice.reducer;
