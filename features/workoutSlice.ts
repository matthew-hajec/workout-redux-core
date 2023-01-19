import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_REPS_VOLUME, DEFAULT_SETS, DEFAULT_TIMED_VOLUME } from '../defaults';
import { Exercise, TrackingType } from '../types/Exercise';

import type { Routine } from "../types/Routine";

import type { PayloadAction } from "@reduxjs/toolkit";

interface WorkoutState {
  exerciseIDs: string[];
  exercises: {
    [id: string]: Exercise;
  };
  routineIDs: string[];
  routines: {
    [id: string]: Routine;
  };
}

const name = "workout";

const initialState: WorkoutState = {
  exerciseIDs: [],
  exercises: {},
  routineIDs: [],
  routines: {},
};

const reducers = {
  addExercise: (state, action: PayloadAction<Exercise>) => {
    const { id } = action.payload;
    state.exerciseIDs.push(id);
    state.exercises[id] = action.payload;
  },
  updateExercise: (
    state,
    action: PayloadAction<
      Omit<Partial<Exercise> & { id: string }, "trackingType">
    >
  ) => {
    const { id, ...updatedExercise } = action.payload;
    state.exercises[id] = { ...state.exercises[id], ...updatedExercise };
  },
  addRoutine: (state, action: PayloadAction<Routine>) => {
    const { id } = action.payload;
    state.routineIDs.push(id);
    state.routines[id] = action.payload;
  },
  updateRoutine: (
    state,
    action: PayloadAction<Partial<Routine> & { id: string }>
  ) => {
    const { id, ...updatedRoutine } = action.payload;
    state.routines[id] = { ...state.routines[id], ...updatedRoutine };
  },
  addDayToRoutine: (
    state,
    action: PayloadAction<{ routineID: string; day: Routine["days"][0] }>
  ) => {
    const { routineID, day } = action.payload;

    state.routines[routineID].days.push(day);
  },
  deleteRoutine: (state, action: PayloadAction<string>) => {
    const id = action.payload;

    state.routineIDs = state.routineIDs.filter((routineID) => routineID !== id);
    delete state.routines[id];
  },
  updateDayInRoutine: (
    state,
    action: PayloadAction<
      Partial<Routine["days"][0]> & { routineID: string; dayIndex: number }
    >
  ) => {
    const { routineID, dayIndex, ...updatedDay } = action.payload;
    state.routines[routineID].days[dayIndex] = {
      ...state.routines[routineID].days[dayIndex],
      ...updatedDay,
    };
  },
  removeDayFromRoutine: (
    state,
    action: PayloadAction<{ routineID: string; dayIndex: number }>
  ) => {
    const { routineID, dayIndex } = action.payload;

    state.routines[routineID].days.splice(dayIndex, 1);
  },
  addExerciseToRoutine: (
    state,
    action: PayloadAction<{
      routineID: string;
      dayIndex: number;
      exerciseID: string;
    }>
  ) => {
    const { routineID, dayIndex, exerciseID } = action.payload;

    state.routines[routineID].days[dayIndex].exercises.push({
      exerciseID,
      sets: Array(DEFAULT_SETS).fill({
        volume:
          state.exercises[exerciseID].trackingType === TrackingType.Reps
            ? DEFAULT_REPS_VOLUME
            : DEFAULT_TIMED_VOLUME,
        isPlusSet: false,
      }),
    });
  },
  updateExerciseInRoutine: (
    state,
    action: PayloadAction<
      Partial<Routine["days"][0]["exercises"][0]> & {
        routineID: string;
        dayIndex: number;
        exerciseIndex: number;
      }
    >
  ) => {
    const { routineID, dayIndex, exerciseIndex, ...updatedExercise } =
      action.payload;
    state.routines[routineID].days[dayIndex].exercises[exerciseIndex] = {
      ...state.routines[routineID].days[dayIndex].exercises[exerciseIndex],
      ...updatedExercise,
    };
  },
  removeExerciseFromRoutine: (
    state,
    action: PayloadAction<{
      routineID: string;
      dayIndex: number;
      exerciseIndex: number;
    }>
  ) => {
    const { routineID, dayIndex, exerciseIndex } = action.payload;

    state.routines[routineID].days[dayIndex].exercises.splice(exerciseIndex, 1);
  },
  updateSetInRoutine: (
    state,
    action: PayloadAction<
      Partial<Routine["days"][0]["exercises"][0]["sets"][0]> & {
        routineID: string;
        dayIndex: number;
        exerciseIndex: number;
        setIndex: number;
      }
    >
  ) => {
    const { routineID, dayIndex, exerciseIndex, setIndex, ...updatedSet } =
      action.payload;
    state.routines[routineID].days[dayIndex].exercises[exerciseIndex].sets[
      setIndex
    ] = {
      ...state.routines[routineID].days[dayIndex].exercises[exerciseIndex].sets[
        setIndex
      ],
      ...updatedSet,
    };
  },
  addSetToRoutine: (
    state,
    action: PayloadAction<{
      routineID: string;
      dayIndex: number;
      exerciseIndex: number;
    }>
  ) => {
    const { routineID, dayIndex, exerciseIndex } = action.payload;

    state.routines[routineID].days[dayIndex].exercises[exerciseIndex].sets.push(
      {
        volume:
          state.exercises[
            state.routines[routineID].days[dayIndex].exercises[exerciseIndex]
              .exerciseID
          ].trackingType === TrackingType.Reps
            ? DEFAULT_REPS_VOLUME
            : DEFAULT_TIMED_VOLUME,
        isPlusSet: false,
      }
    );
  },
  deleteSetFromRoutine: (
    state,
    action: PayloadAction<{
      routineID: string;
      dayIndex: number;
      exerciseIndex: number;
      setIndex: number;
    }>
  ) => {
    const { routineID, dayIndex, exerciseIndex, setIndex } = action.payload;

    state.routines[routineID].days[dayIndex].exercises[
      exerciseIndex
    ].sets.splice(setIndex, 1);
  },
};

export const workoutSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const {
  addExercise,
  updateExercise,
  addRoutine,
  updateRoutine,
  deleteRoutine,
  addDayToRoutine,
  updateDayInRoutine,
  removeDayFromRoutine,
  addExerciseToRoutine,
  updateExerciseInRoutine,
  removeExerciseFromRoutine,
  updateSetInRoutine,
  addSetToRoutine,
  deleteSetFromRoutine,
} = workoutSlice.actions;

export default workoutSlice.reducer;
