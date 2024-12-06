import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    regions: [],
    loading: false,
    error: null
};

const regionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {
        setRegions: (state, action) => {
            state.regions = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        addRegion: (state, action) => {
            state.regions.push(action.payload);
        },
        updateRegion: (state, action) => {
            const index = state.regions.findIndex(region => region.id === action.payload.id);
            if (index !== -1) {
                state.regions[index] = action.payload;
            }
        },
        deleteRegion: (state, action) => {
            state.regions = state.regions.filter(region => region.id !== action.payload);
        }
    }
});

export const { 
    setRegions, 
    setLoading, 
    setError, 
    addRegion, 
    updateRegion, 
    deleteRegion 
} = regionSlice.actions;

export default regionSlice.reducer;
