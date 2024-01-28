// albumSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from '../data';

const initialState = {
    album: null,
    loading: false,
    error: null,
};

export const fetchAlbum = createAsyncThunk("results/fetch", async (albumId) => {

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
            method: 'GET',
            headers,
        })
        const data = await response.json();
        return data;
    }
    catch(err) {
        throw err
    }
})

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbum.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlbum.fulfilled, (state, action) => {
                state.loading = false;
                state.album = action.payload;
            })
            .addCase(fetchAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default albumSlice.reducer;
