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
      console.log(`Adding page data for file: ${fileName}`, pageData);
      state.pages[fileName].push(pageData);
      console.log(`Current pages for file: ${fileName}`, state.pages[fileName]);
    },
    clearParsedData: () => ({
      pages: {},
    }),
  },
});

export const { setParsedData, clearParsedData } = parsedDataSlice.actions;
export default parsedDataSlice.reducer;