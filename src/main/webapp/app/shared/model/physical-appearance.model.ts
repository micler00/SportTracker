import { IPatient } from 'app/shared/model/patient.model';

export interface IPhysicalAppearance {
  id?: number;
  weight?: number;
  height?: number;
  patient?: IPatient;
}

export class PhysicalAppearance implements IPhysicalAppearance {
  constructor(public id?: number, public weight?: number, public height?: number, public patient?: IPatient) {}
}
