import { createSlice } from '@reduxjs/toolkit';

export const fileSlice = createSlice({
  name: 'file',
  initialState: {
    selectedFile: null,
    files: [],
  },
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { setSelectedFile, setFiles } = fileSlice.actions;

export default fileSlice.reducer;
