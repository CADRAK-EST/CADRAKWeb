import { createSlice } from '@reduxjs/toolkit';

const parsedDataSlice = createSlice({
  name: 'parsedData',
  initialState: {
    views: []
  },
  reducers: {
    setParsedData: (state, action) => {
      state.views = action.payload.views.map(view => ({ ...view, visible: true }));
    },
    clearParsedData: () => ({
      views: []
    }),
    toggleView: (state, action) => {
      const viewIndex = action.payload;
      if (state.views[viewIndex])
      {
        state.views[viewIndex].visible = !state.views[viewIndex].visible;
      }
      else {
        console.warn('Attempted to toggle a view that does not exist:', viewIndex);
      }
    }
  },
});

export const { setParsedData, clearParsedData, toggleView } = parsedDataSlice.actions;
export default parsedDataSlice.reducer;
