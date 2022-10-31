import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import classReducer from './class/classSlice'
import studentReducer from './student/studentSlice'
export const store = configureStore({
  reducer: {
    class: classReducer,
    student: studentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
