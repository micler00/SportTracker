import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPhysicalAppearance, PhysicalAppearance } from 'app/shared/model/physical-appearance.model';
import { PhysicalAppearanceService } from './physical-appearance.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';

@Component({
  selector: 'jhi-physical-appearance-update',
  templateUrl: './physical-appearance-update.component.html'
})
export class PhysicalAppearanceUpdateComponent implements OnInit {
  isSaving = false;

  patients: IPatient[] = [];

  editForm = this.fb.group({
    id: [],
    weight: [null, [Validators.required]],
    height: [],
    patient: []
  });

  constructor(
    protected physicalAppearanceService: PhysicalAppearanceService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ physicalAppearance }) => {
      this.updateForm(physicalAppearance);

      this.patientService
        .query()
        .pipe(
          map((res: HttpResponse<IPatient[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPatient[]) => (this.patients = resBody));
    });
  }

  updateForm(physicalAppearance: IPhysicalAppearance): void {
    this.editForm.patchValue({
      id: physicalAppearance.id,
      weight: physicalAppearance.weight,
      height: physicalAppearance.height,
      patient: physicalAppearance.patient
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const physicalAppearance = this.createFromForm();
    if (physicalAppearance.id !== undefined) {
      this.subscribeToSaveResponse(this.physicalAppearanceService.update(physicalAppearance));
    } else {
      this.subscribeToSaveResponse(this.physicalAppearanceService.create(physicalAppearance));
    }
  }

  private createFromForm(): IPhysicalAppearance {
    return {
      ...new PhysicalAppearance(),
      id: this.editForm.get(['id'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      height: this.editForm.get(['height'])!.value,
      patient: this.editForm.get(['patient'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhysicalAppearance>>): void {
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

  trackById(index: number, item: IPatient): any {
    return item.id;
  }
}
