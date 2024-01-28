import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { headers } from "../data";

const initialState = {
    results: null,
    loading: false,
    error: null,
}

export const getResults = createAsyncThunk("results/fetch", async (query) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`, {
            method: 'GET',
            headers,
        })
        const data = await response.json();
        return data.data;
    } catch (error) {
        throw error;
    }

});

const searchResultsSlice = createSlice ({
    name: 'searchResults',
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(getResults.pending, (state) => {
                state.loading = true;
                state.results = [];
            })
            .addCase(getResults.fulfilled, (state, action) =>  {
                state.loading = false;
                state.results = action.payload;
                console.log(state.results)
            })
            .addCase(getResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default searchResultsSlice.reducer;
