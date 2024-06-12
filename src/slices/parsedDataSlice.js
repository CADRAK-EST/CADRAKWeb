import { createSlice } from '@reduxjs/toolkit';

const parsedDataSlice = createSlice({
  name: 'parsedData',
  initialState: null,
  reducers: {
    setParsedData: (state, action) => action.payload,
    clearParsedData: () => null,
  },
});

export const { setParsedData, clearParsedData } = parsedDataSlice.actions;
export default parsedDataSlice.reducer;