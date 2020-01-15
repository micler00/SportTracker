import { IWorkout } from 'app/shared/model/workout.model';

export interface IActivity {
  id?: number;
  name?: string;
  calPerHour?: number;
  workouts?: IWorkout[];
}

export class Activity implements IActivity {
  constructor(public id?: number, public name?: string, public calPerHour?: number, public workouts?: IWorkout[]) {}
}
