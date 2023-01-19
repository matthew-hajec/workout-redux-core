import type { Exercise } from "./Exercise";

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
