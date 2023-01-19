"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSetFromRoutine = exports.addSetToRoutine = exports.updateSetInRoutine = exports.removeExerciseFromRoutine = exports.updateExerciseInRoutine = exports.addExerciseToRoutine = exports.removeDayFromRoutine = exports.updateDayInRoutine = exports.addDayToRoutine = exports.deleteRoutine = exports.updateRoutine = exports.addRoutine = exports.updateExercise = exports.addExercise = exports.workoutSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const defaults_1 = require("../defaults");
const Exercise_1 = require("../types/Exercise");
const name = "workout";
const initialState = {
    exerciseIDs: [],
    exercises: {},
    routineIDs: [],
    routines: {},
};
const reducers = {
    addExercise: (state, action) => {
        const { id } = action.payload;
        state.exerciseIDs.push(id);
        state.exercises[id] = action.payload;
    },
    updateExercise: (state, action) => {
        const _a = action.payload, { id } = _a, updatedExercise = __rest(_a, ["id"]);
        state.exercises[id] = Object.assign(Object.assign({}, state.exercises[id]), updatedExercise);
    },
    addRoutine: (state, action) => {
        const { id } = action.payload;
        state.routineIDs.push(id);
        state.routines[id] = action.payload;
    },
    updateRoutine: (state, action) => {
        const _a = action.payload, { id } = _a, updatedRoutine = __rest(_a, ["id"]);
        state.routines[id] = Object.assign(Object.assign({}, state.routines[id]), updatedRoutine);
    },
    addDayToRoutine: (state, action) => {
        const { routineID, day } = action.payload;
        state.routines[routineID].days.push(day);
    },
    deleteRoutine: (state, action) => {
        const id = action.payload;
        state.routineIDs = state.routineIDs.filter((routineID) => routineID !== id);
        delete state.routines[id];
    },
    updateDayInRoutine: (state, action) => {
        const _a = action.payload, { routineID, dayIndex } = _a, updatedDay = __rest(_a, ["routineID", "dayIndex"]);
        state.routines[routineID].days[dayIndex] = Object.assign(Object.assign({}, state.routines[routineID].days[dayIndex]), updatedDay);
    },
    removeDayFromRoutine: (state, action) => {
        const { routineID, dayIndex } = action.payload;
        state.routines[routineID].days.splice(dayIndex, 1);
    },
    addExerciseToRoutine: (state, action) => {
        const { routineID, dayIndex, exerciseID } = action.payload;
        state.routines[routineID].days[dayIndex].exercises.push({
            exerciseID,
            sets: Array(defaults_1.DEFAULT_SETS).fill({
                volume: state.exercises[exerciseID].trackingType === Exercise_1.TrackingType.Reps
                    ? defaults_1.DEFAULT_REPS_VOLUME
                    : defaults_1.DEFAULT_TIMED_VOLUME,
                isPlusSet: false,
            }),
        });
    },
    updateExerciseInRoutine: (state, action) => {
        const _a = action.payload, { routineID, dayIndex, exerciseIndex } = _a, updatedExercise = __rest(_a, ["routineID", "dayIndex", "exerciseIndex"]);
        state.routines[routineID].days[dayIndex].exercises[exerciseIndex] = Object.assign(Object.assign({}, state.routines[routineID].days[dayIndex].exercises[exerciseIndex]), updatedExercise);
    },
    removeExerciseFromRoutine: (state, action) => {
        const { routineID, dayIndex, exerciseIndex } = action.payload;
        state.routines[routineID].days[dayIndex].exercises.splice(exerciseIndex, 1);
    },
    updateSetInRoutine: (state, action) => {
        const _a = action.payload, { routineID, dayIndex, exerciseIndex, setIndex } = _a, updatedSet = __rest(_a, ["routineID", "dayIndex", "exerciseIndex", "setIndex"]);
        state.routines[routineID].days[dayIndex].exercises[exerciseIndex].sets[setIndex] = Object.assign(Object.assign({}, state.routines[routineID].days[dayIndex].exercises[exerciseIndex].sets[setIndex]), updatedSet);
    },
    addSetToRoutine: (state, action) => {
        const { routineID, dayIndex, exerciseIndex } = action.payload;
        state.routines[routineID].days[dayIndex].exercises[exerciseIndex].sets.push({
            volume: state.exercises[state.routines[routineID].days[dayIndex].exercises[exerciseIndex]
                .exerciseID].trackingType === Exercise_1.TrackingType.Reps
                ? defaults_1.DEFAULT_REPS_VOLUME
                : defaults_1.DEFAULT_TIMED_VOLUME,
            isPlusSet: false,
        });
    },
    deleteSetFromRoutine: (state, action) => {
        const { routineID, dayIndex, exerciseIndex, setIndex } = action.payload;
        state.routines[routineID].days[dayIndex].exercises[exerciseIndex].sets.splice(setIndex, 1);
    },
};
exports.workoutSlice = (0, toolkit_1.createSlice)({
    name,
    initialState,
    reducers,
});
_a = exports.workoutSlice.actions, exports.addExercise = _a.addExercise, exports.updateExercise = _a.updateExercise, exports.addRoutine = _a.addRoutine, exports.updateRoutine = _a.updateRoutine, exports.deleteRoutine = _a.deleteRoutine, exports.addDayToRoutine = _a.addDayToRoutine, exports.updateDayInRoutine = _a.updateDayInRoutine, exports.removeDayFromRoutine = _a.removeDayFromRoutine, exports.addExerciseToRoutine = _a.addExerciseToRoutine, exports.updateExerciseInRoutine = _a.updateExerciseInRoutine, exports.removeExerciseFromRoutine = _a.removeExerciseFromRoutine, exports.updateSetInRoutine = _a.updateSetInRoutine, exports.addSetToRoutine = _a.addSetToRoutine, exports.deleteSetFromRoutine = _a.deleteSetFromRoutine;
exports.default = exports.workoutSlice.reducer;
