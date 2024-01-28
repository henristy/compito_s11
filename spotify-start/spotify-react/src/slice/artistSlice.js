
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { headers } from '../data';

const initialState = {
    artist: null,
    loading: false,
    error: null,
};

export const fetchArtist = createAsyncThunk("results/fetch", async (artistId) => {

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`, {
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

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtist.fulfilled, (state, action) => {
                state.loading = false;
                state.artist = action.payload;
            })
            .addCase(fetchArtist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default artistSlice.reducer;
