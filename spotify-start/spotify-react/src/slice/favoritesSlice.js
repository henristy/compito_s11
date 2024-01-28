import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    songs: []
  },
  reducers: {
    AddToFavorites: (state, action) => {
      state.songs.push(action.payload);
    },
    RemoveFromFavorites: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload.id);
    },
  }
});

export const { AddToFavorites, RemoveFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
