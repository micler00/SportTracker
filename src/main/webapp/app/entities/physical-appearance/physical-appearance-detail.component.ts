import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhysicalAppearance } from 'app/shared/model/physical-appearance.model';

@Component({
  selector: 'jhi-physical-appearance-detail',
  templateUrl: './physical-appearance-detail.component.html'
})
export class PhysicalAppearanceDetailComponent implements OnInit {
  physicalAppearance: IPhysicalAppearance | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ physicalAppearance }) => {
      this.physicalAppearance = physicalAppearance;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
