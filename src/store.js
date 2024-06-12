import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './slices/fileSlice';
import parsedDataReducer from './slices/parsedDataSlice';

export const store = configureStore({
  reducer: {
    file: fileReducer,
    parsedData: parsedDataReducer,
  },
});