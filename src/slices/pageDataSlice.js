import { createSlice } from '@reduxjs/toolkit';

const pageDataSlice = createSlice({
  name: 'pageData',
  initialState: {
    selectedPage: null,
    views: [],
    visibility: [],
    texts: { texts: [], mtexts: [] },// Store visibility of each view
    metadata: {}, // Add metadata to initial state
    isPageLoaded: false
  },
  reducers: {
    setPage: (state, action) => {
      state.selectedPage = action.payload;
      state.views = action.payload.views.map(view => ({ ...view, visible: true }));
      state.visibility = action.payload.views.map(() => true); // Initialize all views as visible
      state.texts = action.payload.texts || { texts: [], mtexts: [], attdefs: [] };
      state.metadata = action.payload.metadata || {}; // Set metadata
      state.isPageLoaded = false
    },
    clearPage: () => ({
      selectedPage: null,
      views: [],
      visibility: [],
      texts: { texts: [], mtexts: [] },
      metadata: {}, // Clear metadata
      isPageLoaded: false
    }),
    toggleView: (state, action) => {
      const viewIndex = action.payload;
      if (state.visibility[viewIndex] !== undefined) {
        state.visibility[viewIndex] = !state.visibility[viewIndex];
      } else {
        console.warn('Attempted to toggle a view that does not exist:', viewIndex);
      }
    },
    setPageLoaded: (state) => {
      state.isPageLoaded = true;
    },
  },
});

export const { setPage, clearPage, toggleView, setPageLoaded } = pageDataSlice.actions;
export default pageDataSlice.reducer;