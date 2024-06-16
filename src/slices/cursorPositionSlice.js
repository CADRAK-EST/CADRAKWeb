import { createSlice } from '@reduxjs/toolkit';

export const cursorPositionSlice = createSlice({
  name: 'cursorPosition',
  initialState: {
    x: 0,
    y: 0
  },
  reducers: {
    updateCursorPosition: (state, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    }
  }
});

export const { updateCursorPosition } = cursorPositionSlice.actions;
export default cursorPositionSlice.reducer;
