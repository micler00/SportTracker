import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { IWorkout, Workout } from 'app/shared/model/workout.model';
import { WorkoutService } from './workout.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';
import { IActivity } from 'app/shared/model/activity.model';
import { ActivityService } from 'app/entities/activity/activity.service';

type SelectableEntity = IPatient | IActivity;

@Component({
  selector: 'jhi-workout-update',
  templateUrl: './workout-update.component.html'
})
export class WorkoutUpdateComponent implements OnInit {
  isSaving = false;

  patients: IPatient[] = [];

  activities: IActivity[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    patient: [],
    activity: []
  });

  constructor(
    protected workoutService: WorkoutService,
    protected patientService: PatientService,
    protected activityService: ActivityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workout }) => {
      this.updateForm(workout);

      this.patientService
        .query()
        .pipe(
          map((res: HttpResponse<IPatient[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPatient[]) => (this.patients = resBody));

      this.activityService
        .query()
        .pipe(
          map((res: HttpResponse<IActivity[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IActivity[]) => (this.activities = resBody));
    });
  }

  updateForm(workout: IWorkout): void {
    this.editForm.patchValue({
      id: workout.id,
      date: workout.date,
      duration: workout.duration,
      patient: workout.patient,
      activity: workout.activity
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workout = this.createFromForm();
    if (workout.id !== undefined) {
      this.subscribeToSaveResponse(this.workoutService.update(workout));
    } else {
      this.subscribeToSaveResponse(this.workoutService.create(workout));
    }
  }

  private createFromForm(): IWorkout {
    return {
      ...new Workout(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      patient: this.editForm.get(['patient'])!.value,
      activity: this.editForm.get(['activity'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkout>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
