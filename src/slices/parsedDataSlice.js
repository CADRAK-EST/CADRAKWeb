import { createSlice } from '@reduxjs/toolkit';

const parsedDataSlice = createSlice({
  name: 'parsedData',
  initialState: {
    pages: {},
  },
  reducers: {
    setParsedData: (state, action) => {
      const { fileName, pageData } = action.payload;
      if (!state.pages[fileName]) {
        state.pages[fileName] = [];
      }
      state.pages[fileName].push(pageData);
    },
    clearParsedData: () => ({
      pages: {},
    }),
  },
});

export const { setParsedData, clearParsedData } = parsedDataSlice.actions;
export default parsedDataSlice.reducer;