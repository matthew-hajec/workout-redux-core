import { v4 as uuidv4 } from 'uuid';

import { DEFAULT_REPS_VOLUME, DEFAULT_SETS, DEFAULT_TIMED_VOLUME } from '../defaults';
import createTestStore from '../misc/createTestStore';
import { Equipment, Size, TrackingType } from '../types/Exercise';
import * as actions from './workoutSlice';

const testExercise = {
  id: uuidv4(),
  name: "Bench Press",
  equipment: Equipment.Barbell,
  primaryMuscle: "Chest",
  secondaryMuscles: ["Triceps"],
  size: Size.Large,
  isCustom: true,
  isArchived: false,
  trackingType: TrackingType.Reps,
};

// ==============================
// Exercise Tests
// ==============================

test("adds exercise", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  expect(store.getState().workout.exercises).toEqual({
    [testExercise.id]: testExercise,
  });
});

test("updates exercise name", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  const newName = "New Name";
  store.dispatch(
    actions.updateExercise({
      id: testExercise.id,
      name: newName,
    })
  );

  expect(store.getState().workout.exercises[testExercise.id].name).toEqual(
    newName
  );
});

test("updates exercise equipment", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  const newEquipment = Equipment.Dumbbell;
  store.dispatch(
    actions.updateExercise({
      id: testExercise.id,
      equipment: newEquipment,
    })
  );

  expect(store.getState().workout.exercises[testExercise.id].equipment).toEqual(
    newEquipment
  );
});

test("updates exercise primary muscle", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  const newPrimaryMuscle = "New Primary Muscle";
  store.dispatch(
    actions.updateExercise({
      id: testExercise.id,
      primaryMuscle: newPrimaryMuscle,
    })
  );

  expect(
    store.getState().workout.exercises[testExercise.id].primaryMuscle
  ).toEqual(newPrimaryMuscle);
});

test("updates exercise secondary muscles", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  const newSecondaryMuscles = ["New Secondary Muscle"];
  store.dispatch(
    actions.updateExercise({
      id: testExercise.id,
      secondaryMuscles: newSecondaryMuscles,
    })
  );

  expect(
    store.getState().workout.exercises[testExercise.id].secondaryMuscles
  ).toEqual(newSecondaryMuscles);
});

test("updates exercise size", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  const newSize = Size.Small;
  store.dispatch(
    actions.updateExercise({
      id: testExercise.id,
      size: newSize,
    })
  );

  expect(store.getState().workout.exercises[testExercise.id].size).toEqual(
    newSize
  );
});

test("updates exercise isCustom", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  const newIsCustom = false;

  store.dispatch(
    actions.updateExercise({
      id: testExercise.id,
      isCustom: newIsCustom,
    })
  );
});

test("updates exercise isArchived", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  const newIsArchived = true;
  store.dispatch(
    actions.updateExercise({
      id: testExercise.id,
      isArchived: newIsArchived,
    })
  );

  expect(
    store.getState().workout.exercises[testExercise.id].isArchived
  ).toEqual(newIsArchived);
});

// ==============================
// Routine Tests
// ==============================

const testRoutine = {
  id: uuidv4(),
  name: "Test Routine",
  days: [],
};

const testDay = {
  name: "Day 1",
  exercises: [],
};

test("adds routine", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  expect(store.getState().workout.routines).toEqual({
    [testRoutine.id]: testRoutine,
  });
});

test("updates routine name", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  const newName = "New Name";
  store.dispatch(
    actions.updateRoutine({
      id: testRoutine.id,
      name: newName,
    })
  );

  expect(store.getState().workout.routines[testRoutine.id].name).toEqual(
    newName
  );
});

test("adds day to routine", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  expect(store.getState().workout.routines[testRoutine.id].days).toEqual([
    testDay,
  ]);
});

test("updates day name", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  const newName = "New Name";

  store.dispatch(
    actions.updateDayInRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      name: newName,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].name
  ).toEqual(newName);
});

test("adds exercise to day", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].exercises
  ).toEqual([
    {
      exerciseID: testExercise.id,
      sets: Array(DEFAULT_SETS).fill({
        volume:
          testExercise.trackingType === TrackingType.Reps
            ? DEFAULT_REPS_VOLUME
            : DEFAULT_TIMED_VOLUME,
        isPlusSet: false,
      }),
    },
  ]);
});

test("replace an exercise in a day", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  const newExerciseID = uuidv4();

  store.dispatch(
    actions.addExercise({
      ...testExercise,
      id: newExerciseID,
    })
  );

  store.dispatch(
    actions.updateExerciseInRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseIndex: 0,
      exerciseID: newExerciseID,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].exercises[0]
      .exerciseID
  ).toEqual(newExerciseID);
});

test("updates the volume in an exercise in a day", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  const newVolume = 10;

  store.dispatch(
    actions.updateSetInRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseIndex: 0,
      setIndex: 0,
      volume: newVolume,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].exercises[0]
      .sets[0].volume
  ).toEqual(newVolume);
});

test("updates the isPlusSet in an exercise in a day", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  const newIsPlusSet = true;

  store.dispatch(
    actions.updateSetInRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseIndex: 0,
      setIndex: 0,
      isPlusSet: newIsPlusSet,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].exercises[0]
      .sets[0].isPlusSet
  ).toEqual(newIsPlusSet);
});

test("adds a new set to an exercise in a day", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  store.dispatch(
    actions.addSetToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseIndex: 0,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].exercises[0].sets
      .length
  ).toEqual(DEFAULT_SETS + 1);
});

test("removes a set from an exercise in a day", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  store.dispatch(
    actions.deleteSetFromRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseIndex: 0,
      setIndex: 0,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].exercises[0].sets
      .length
  ).toEqual(DEFAULT_SETS - 1);
});

test("removes an exercise from a routine", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  store.dispatch(
    actions.removeExerciseFromRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseIndex: 0,
    })
  );

  expect(
    store.getState().workout.routines[testRoutine.id].days[0].exercises.length
  ).toEqual(0);
});

test("removes a day from a routine", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  store.dispatch(
    actions.removeDayFromRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
    })
  );

  expect(store.getState().workout.routines[testRoutine.id].days.length).toEqual(
    0
  );
});

test("deletes a routine", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.deleteRoutine(testRoutine.id));

  expect(store.getState().workout.routines).toEqual({});
});

// ==============================
// Active Routine Tests
// ==============================

test("sets the active routine", () => {
  const store = createTestStore();

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.activateRoutine(testRoutine.id));

  expect(store.getState().workout.activeRoutine).not.toBeNull();
  expect(store.getState().workout.activeRoutine!.id).toEqual(testRoutine.id);
});

test('sets the active routine to "null" when no routine is active', () => {
  const store = createTestStore();

  store.dispatch(actions.deactivateRoutine());

  expect(store.getState().workout.activeRoutine).toBeNull();
});

test("creates the isCompleted property and sets it to false when a routine is activated", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.activateRoutine(testRoutine.id));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  expect(store.getState().workout.activeRoutine).not.toBeNull();

  store.getState().workout.activeRoutine!.days.forEach((day) => {
    day.exercises.forEach((e) =>
      e.sets.forEach((s) => expect(s.isCompleted).toBe(false))
    );
  });
});

test("creates the weight property and sets it to something besides undefined when a routine is activated", () => {
  const store = createTestStore();

  store.dispatch(actions.addExercise(testExercise));

  store.dispatch(actions.addRoutine(testRoutine));

  store.dispatch(actions.activateRoutine(testRoutine.id));

  store.dispatch(
    actions.addDayToRoutine({
      routineID: testRoutine.id,
      day: testDay,
    })
  );

  store.dispatch(
    actions.addExerciseToRoutine({
      routineID: testRoutine.id,
      dayIndex: 0,
      exerciseID: testExercise.id,
    })
  );

  expect(store.getState().workout.activeRoutine).not.toBeNull();

  store.getState().workout.activeRoutine!.days.forEach((day) => {
    day.exercises.forEach((e) =>
      e.sets.forEach((s) => expect(s.weight).not.toBe(undefined))
    );
  });
});
