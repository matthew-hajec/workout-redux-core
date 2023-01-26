export interface Routine {
  id: string; // Routine ID
  name: string; // Routine Name
  days: {
    name: string; // Day Name
    exercises: {
      exerciseID: string; // Exercise ID
      sets: {
        volume: number; // Number of reps or time in seconds
        isPlusSet: boolean; // Is this a plus set? (for example: 5+ reps vs 5 reps)
      }[];
    }[];
  }[];
}

export interface ActiveRoutine extends Routine {
  startTmDt: Date; // Routine Start Date Time
  currentDayIndex: number | null; // Current Day Index
  currentDayStartTmDt: number | null; // Current Day Start Date Time
  days: {
    name: string; // Day Name
    exercises: {
      exerciseID: string; // Exercise ID
      sets: {
        volume: number; // Number of reps or time in seconds
        isPlusSet: boolean; // Is this a plus set? (for example: 5+ reps vs 5 reps)
        isCompleted: boolean; // Has this set been completed?
        weight: number; // Weight used for this set
      }[];
    }[];
  }[];
}
