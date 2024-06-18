import { createSlice } from '@reduxjs/toolkit';

const pageDataSlice = createSlice({
  name: 'pageData',
  initialState: {
    selectedPage: null,
    views: [],
    visibility: [], // Store visibility of each view
  },
  reducers: {
    setPage: (state, action) => {
      state.selectedPage = action.payload;
      state.views = action.payload.views.map(view => ({ ...view, visible: true }));
      state.visibility = action.payload.views.map(() => true); // Initialize all views as visible
    },
    clearPage: () => ({
      selectedPage: null,
      views: [],
      visibility: [],
    }),
    toggleView: (state, action) => {
      const viewIndex = action.payload;
      if (state.visibility[viewIndex] !== undefined) {
        state.visibility[viewIndex] = !state.visibility[viewIndex];
      } else {
        console.warn('Attempted to toggle a view that does not exist:', viewIndex);
      }
    }
  },
});

export const { setPage, clearPage, toggleView } = pageDataSlice.actions;
export default pageDataSlice.reducer;