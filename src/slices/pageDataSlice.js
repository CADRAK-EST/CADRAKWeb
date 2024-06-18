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
      state.views[viewIndex].visible = !state.views[viewIndex].visible;
    },
  },
});

export const { setPage, clearPage, toggleView } = pageDataSlice.actions;
export default pageDataSlice.reducer;