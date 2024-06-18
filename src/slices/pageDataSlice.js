import { createSlice } from '@reduxjs/toolkit';

const pageDataSlice = createSlice({
  name: 'pageData',
  initialState: {
    selectedPage: null,
    views: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.selectedPage = action.payload;
      state.views = action.payload.views.map(view => ({ ...view, visible: true }));
    },
    clearPage: () => ({
      selectedPage: null,
      views: [],
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

export const { setPage, clearPage, toggleView } = pageDataSlice.actions;
export default pageDataSlice.reducer;