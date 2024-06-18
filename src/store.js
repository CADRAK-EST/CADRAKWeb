import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './slices/fileSlice';
import parsedDataReducer from './slices/parsedDataSlice';
import pageDataReducer from './slices/pageDataSlice';
import cursorPositionReducer from './slices/cursorPositionSlice';

export const store = configureStore({
  reducer: {
    file: fileReducer,
    parsedData: parsedDataReducer,
    pageData: pageDataReducer,
    cursorPosition: cursorPositionReducer,
  },
});
