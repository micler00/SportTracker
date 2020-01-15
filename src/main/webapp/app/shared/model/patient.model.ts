import { Moment } from 'moment';
import { IWorkout } from 'app/shared/model/workout.model';
import { IPhysicalAppearance } from 'app/shared/model/physical-appearance.model';

export interface IPatient {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: Moment;
  eMail?: string;
  workouts?: IWorkout[];
  physicalAppearances?: IPhysicalAppearance[];
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public gender?: string,
    public dateOfBirth?: Moment,
    public eMail?: string,
    public workouts?: IWorkout[],
    public physicalAppearances?: IPhysicalAppearance[]
  ) {}
}
