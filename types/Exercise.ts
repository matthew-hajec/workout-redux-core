export enum TrackingType {
  Reps,
  Time,
}

export enum Size {
  Small,
  Medium,
  Large,
}

export enum Equipment {
  Barbell,
  Dumbbell,
  Machine,
  Bodyweight,
  Other,
}

export interface Exercise {
  id: string;
  name: string;
  equipment: Equipment;
  primaryMuscle: string;
  secondaryMuscles: string[];
  size: Size;
  isCustom: boolean;
  isArchived: boolean;
  trackingType: TrackingType;
}
