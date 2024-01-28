import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: 'queue',
  initialState : {
    queue: null,
    current: null,
  },
  reducers: {
    Play: (state, action) => {
      state.current =  action.payload
    },
    AddToQueue: (state, action) => {
      state.queue =  state.queue ? [ ...state.queue, action.payload] : [action.payload]
    },
    RemoveFromQueue: (state, action) => {
      state.queue = state.queue.filter(song => song.id !== action.payload.id)
    },
    PlayAlbum: (state, action) => {
      state.queue =  action.payload
    },
  }
});

export const { Play, AddToQueue, RemoveFromQueue, PlayAlbum } = queueSlice.actions;

export default queueSlice.reducer;
