import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhysicalAppearance } from 'app/shared/model/physical-appearance.model';
import { PhysicalAppearanceService } from './physical-appearance.service';

@Component({
  templateUrl: './physical-appearance-delete-dialog.component.html'
})
export class PhysicalAppearanceDeleteDialogComponent {
  physicalAppearance?: IPhysicalAppearance;

  constructor(
    protected physicalAppearanceService: PhysicalAppearanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.physicalAppearanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('physicalAppearanceListModification');
      this.activeModal.close();
    });
  }
}
