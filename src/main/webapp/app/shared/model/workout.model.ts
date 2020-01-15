import { Moment } from 'moment';
import { IPatient } from 'app/shared/model/patient.model';
import { IActivity } from 'app/shared/model/activity.model';

export interface IWorkout {
  id?: number;
  date?: Moment;
  duration?: number;
  patient?: IPatient;
  activity?: IActivity;
}

export class Workout implements IWorkout {
  constructor(public id?: number, public date?: Moment, public duration?: number, public patient?: IPatient, public activity?: IActivity) {}
}
