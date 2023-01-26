import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_REPS_VOLUME, DEFAULT_SETS, DEFAULT_TIMED_VOLUME } from '../defaults';
import { Exercise, TrackingType } from '../types/Exercise';

import type { Routine, ActiveRoutine } from "../types/Routine";

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
  activeRoutine: ActiveRoutine | null;
}

const name = "workout";

const initialState: WorkoutState = {
  exerciseIDs: [],
  exercises: {},
  routineIDs: [],
  routines: {},
  activeRoutine: null,
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
  updateSetCountInRoutine: (
    state,
    action: PayloadAction<{
      routineID: string;
      dayIndex: number;
      exerciseIndex: number;
      setCount: number;
    }>
  ) => {
    const { routineID, dayIndex, exerciseIndex, setCount } = action.payload;

    const exercise =
      state.routines[routineID].days[dayIndex].exercises[exerciseIndex];

    if (setCount > exercise.sets.length) {
      const newSets = Array(setCount - exercise.sets.length).fill({
        volume:
          state.exercises[exercise.exerciseID].trackingType ===
          TrackingType.Reps
            ? DEFAULT_REPS_VOLUME
            : DEFAULT_TIMED_VOLUME,
        isPlusSet: false,
      });

      exercise.sets.push(...newSets);
    } else {
      exercise.sets.splice(setCount);
    }
  },
  activateRoutine: (state, action: PayloadAction<string>) => {
    const activeRoutine: ActiveRoutine = {
      ...state.routines[action.payload],
      currentDayIndex: null,
      currentDayStartTmDt: null,
      startTmDt: null,
    };

    activeRoutine.days.forEach((d) =>
      d.exercises.forEach((e) =>
        e.sets.forEach((s) => {
          s.isCompleted = false;
          s.weight = 0;
        })
      )
    );

    state.activeRoutine = activeRoutine;
  },
  deactivateRoutine: (state) => {
    state.activeRoutine = null;
  },
  startDay: (
    state,
    action: PayloadAction<{
      dayIndex: number;
      startTmDt: number;
    }>
  ) => {
    state.activeRoutine.currentDayIndex = action.payload.dayIndex;
    state.activeRoutine.currentDayStartTmDt = action.payload.startTmDt;

    if (state.activeRoutine.startTmDt === null) {
      state.activeRoutine.startTmDt = action.payload.startTmDt;
    }
  },
  updateSetCountInActiveRoutine: (
    state: WorkoutState,
    action: PayloadAction<{
      exerciseIndex: number;
      dayIndex: number;
      setCount: number;
    }>
  ) => {
    const { exerciseIndex, dayIndex, setCount } = action.payload;

    const exercise =
      state.activeRoutine?.days[dayIndex].exercises[exerciseIndex];

    if (!exercise) {
      throw new Error(state.activeRoutine ? "Invalid day index" : "No routine");
    }

    if (setCount > exercise.sets.length) {
      const newSets = Array(setCount - exercise.sets.length).fill({
        volume: DEFAULT_REPS_VOLUME,
        isPlusSet: false,
      });

      exercise.sets.push(...newSets);
    } else {
      exercise.sets.splice(setCount);
    }
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
  updateSetCountInRoutine,
  activateRoutine,
  deactivateRoutine,
  startDay,
  updateSetCountInActiveRoutine,
} = workoutSlice.actions;

export default workoutSlice.reducer;
