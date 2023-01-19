import { configureStore } from '@reduxjs/toolkit';

import workoutSlice from '../features/workoutSlice';

export default () =>
  configureStore({
    reducer: {
      workout: workoutSlice,
    },
  });
