import { combineReducers, configureStore } from '@reduxjs/toolkit'
import attendanceReducer from '../components/attendance/attendanceSlice';

const rootReducer = combineReducers({
  attendance: attendanceReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}