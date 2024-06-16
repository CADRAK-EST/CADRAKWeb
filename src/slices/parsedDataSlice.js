import { createSlice } from '@reduxjs/toolkit';

const parsedDataSlice = createSlice({
  name: 'parsedData',
  initialState: {
    views: []
  },
  reducers: {
    setParsedData: (state, action) => {
      state.views = action.payload.views;
    },
    clearParsedData: () => ({
      views: []
    }),
    toggleView: (state, action) => {
      const viewIndex = action.payload;
      state.views[viewIndex].visible = !state.views[viewIndex].visible;
    }
  },
});

export const { setParsedData, clearParsedData, toggleView } = parsedDataSlice.actions;
export default parsedDataSlice.reducer;
