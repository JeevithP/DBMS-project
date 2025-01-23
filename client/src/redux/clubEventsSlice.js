import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const clubEventsSlice = createSlice({
  name: "clubEvents",
  initialState,
  reducers: {
    setEvents: (state, action) => {
        // console.log(action.payload)
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.name !== action.payload
      );
    },
    clearEvents: (state) => {
      state.events = [];
    },
  },
});

export const { setEvents, addEvent, deleteEvent, clearEvents } = clubEventsSlice.actions;
export default clubEventsSlice.reducer;
