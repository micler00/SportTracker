import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPhysicalAppearance } from 'app/shared/model/physical-appearance.model';
import { PhysicalAppearanceService } from './physical-appearance.service';
import { PhysicalAppearanceDeleteDialogComponent } from './physical-appearance-delete-dialog.component';

@Component({
  selector: 'jhi-physical-appearance',
  templateUrl: './physical-appearance.component.html'
})
export class PhysicalAppearanceComponent implements OnInit, OnDestroy {
  physicalAppearances?: IPhysicalAppearance[];
  eventSubscriber?: Subscription;

  constructor(
    protected physicalAppearanceService: PhysicalAppearanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.physicalAppearanceService.query().subscribe((res: HttpResponse<IPhysicalAppearance[]>) => {
      this.physicalAppearances = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPhysicalAppearances();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPhysicalAppearance): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPhysicalAppearances(): void {
    this.eventSubscriber = this.eventManager.subscribe('physicalAppearanceListModification', () => this.loadAll());
  }

  delete(physicalAppearance: IPhysicalAppearance): void {
    const modalRef = this.modalService.open(PhysicalAppearanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.physicalAppearance = physicalAppearance;
  }
}
