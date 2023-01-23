export interface Routine {
  id: string;
  name: string;
  days: {
    name: string;
    exercises: {
      exerciseID: string;
      sets: {
        volume: number;
        isPlusSet: boolean;
      }[];
    }[];
  }[];
}

export interface ActiveRoutine extends Routine {
  startTmDt: Date;
  currentDayIndex: number;
  days: {
    name: string;
    exercises: {
      exerciseID: string;
      sets: {
        volume: number;
        isPlusSet: boolean;
        isCompleted: boolean;
        weight: number;
      }[];
    }[];
  }[];
}
